'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken')
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
      Logout
    </button>
  );
}
