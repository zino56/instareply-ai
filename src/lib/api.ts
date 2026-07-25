const API_BASE = 'https://instaai-saas.onrender.com';

const IS_DEV = import.meta.env.DEV;
const GENERIC_ERROR = 'Something went wrong. Please try again.';

// Backend messages we consider safe to show verbatim (validation, rate-limit, etc).
// Backend must return short, user-facing strings for these to be shown.
const SAFE_STATUS_CODES = new Set([400, 401, 403, 404, 409, 422, 429]);

function getToken(): string | null {
  return localStorage.getItem('conveero_token');
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function logout() {
  // Clear all app-scoped local state so no stale UI flags persist across sessions.
  try {
    localStorage.removeItem('conveero_token');
    localStorage.removeItem('conveero_dev_bypass');
    localStorage.removeItem('conveero-setup-dismissed-v1');
  } catch {
    /* ignore storage errors */
  }
  window.location.href = '/';
}

export function loginWithInstagram() {
  window.location.href = `${API_BASE}/api/auth/instagram/authorize`;
}

export interface ApiFetchOptions extends RequestInit {
  /** Abort signal for cancellation / timeout. */
  signal?: AbortSignal;
}

async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<T> {
  const token = getToken();
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    });
  } catch (err) {
    // Network failure / abort. Log full detail in dev only.
    if (IS_DEV) console.error(`[api] network error ${path}`, err);
    if ((err as any)?.name === 'AbortError') throw err;
    throw new Error(GENERIC_ERROR);
  }

  if (res.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null as any);
    if (IS_DEV) console.error(`[api] ${res.status} ${path}`, body);

    // Only surface backend-provided message for known safe status codes,
    // and only if it looks like a short user-facing string (no stack traces).
    const raw = typeof body?.message === 'string' ? body.message : '';
    const looksSafe = raw && raw.length <= 200 && !/\n|Error:|Traceback|at\s+\w+\s*\(/i.test(raw);
    const message = SAFE_STATUS_CODES.has(res.status) && looksSafe ? raw : GENERIC_ERROR;
    throw new Error(message);
  }

  return res.json();
}

export const api = {
  getClientStatus: (opts?: ApiFetchOptions) => apiFetch<any>('/api/client/status', opts),
  getProducts: (opts?: ApiFetchOptions) => apiFetch<any>('/api/products', opts),
  createProduct: (data: any) =>
    apiFetch<any>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getConversations: (opts?: ApiFetchOptions) => apiFetch<any>('/api/conversations', opts),
  forgotPassword: (email: string) =>
    apiFetch<{ ok: true }>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  resetPassword: (token: string, password: string) =>
    apiFetch<{ ok: true }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),
};

/** Run a promise with an abort-based timeout. Rejects with a friendly Error on timeout. */
export function withTimeout<T>(
  run: (signal: AbortSignal) => Promise<T>,
  ms: number,
  timeoutMessage = 'The dashboard is taking longer than expected. Please try again.'
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return run(controller.signal)
    .catch((err) => {
      if (controller.signal.aborted) throw new Error(timeoutMessage);
      throw err;
    })
    .finally(() => clearTimeout(timer));
}
