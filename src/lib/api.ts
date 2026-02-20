const API_BASE = 'https://instaai-saas.onrender.com';

function getToken(): string | null {
  return localStorage.getItem('conveero_token');
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem('conveero_token');
  window.location.href = '/';
}

export function loginWithInstagram() {
  window.location.href = `${API_BASE}/api/auth/instagram/authorize`;
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
    throw new Error(error.message || 'Request failed');
  }

  return res.json();
}

export const api = {
  getClientStatus: () => apiFetch<any>('/api/client/status'),
  getProducts: () => apiFetch<any>('/api/products'),
  createProduct: (data: any) =>
    apiFetch<any>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getConversations: () => apiFetch<any>('/api/conversations'),
};
