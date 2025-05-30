'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import  Logout  from '@/components/Logout';

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchWithAuth('http://localhost:3030/api/users')
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          console.log('Fetched users:', json.data);
          setUsers(json.data); 
        }
      });
  }, []);

  if (users.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>
      <Logout/>
    </div>
  );
}
