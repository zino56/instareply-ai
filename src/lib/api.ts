const API_BASE = 'https://instaai-saas.onrender.com';

function getToken(): string | null {
  return localStorage.getItem('conveero_token');
}

function setToken(token: string) {
  localStorage.setItem('conveero_token', token);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem('conveero_token');
  window.location.href = '/';
}

export function connectInstagram() {
  window.location.href = `${API_BASE}/api/auth/instagram/authorize`;
}

// Kept for backward-compat with existing imports
export function loginWithInstagram() {
  connectInstagram();
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (res.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || error.error || 'Request failed');
  }

  return res.json();
}

export const api = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const res = await apiFetch<{ token?: string; access_token?: string }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify(data) }
    );
    const token = res.token || res.access_token;
    if (token) setToken(token);
    return res;
  },
  login: async (data: { email: string; password: string }) => {
    const res = await apiFetch<{ token?: string; access_token?: string }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify(data) }
    );
    const token = res.token || res.access_token;
    if (token) setToken(token);
    return res;
  },
  getClientStatus: () => apiFetch<any>('/api/client/status'),
  getProducts: () => apiFetch<any>('/api/products'),
  createProduct: (data: any) =>
    apiFetch<any>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getConversations: () => apiFetch<any>('/api/conversations'),
};
