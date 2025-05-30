const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');

  return await res.json(); // { token, refreshToken, user }
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${API}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error('Failed to refresh token');

  return await res.json(); // { token }
}
