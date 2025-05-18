const API_BASE = 'http://localhost:3000/api';

export async function apiFetch(endpoint, options = {}) {
  // 1) Recupera el token (si existe)
  const token = localStorage.getItem('token');

  // 2) Construye los headers, incluyendo el Authorization si hay token
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  // 3) Lanza el fetch hacia tu backend
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  return res;
}