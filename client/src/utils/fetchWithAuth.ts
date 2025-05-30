import { refreshAccessToken } from '@/service/auth.service';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  let res = await fetch(url, options);

  if (res.status === 401 && refreshToken) {
    try {
      const newTokenData = await refreshAccessToken(refreshToken);
      localStorage.setItem('accessToken', newTokenData.token);

      options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${newTokenData.token}`,
      };

      res = await fetch(url, options);
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }

  return res;
}
