'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

     if (!res.ok) {
        const errorText = await res.text();
        alert(errorText || 'Đăng nhập thất bại!');
        return;
      }

      const data = await res.json();

    if (data.success) {    
      router.push('/admin/dashboard');
    } else {
      alert('Đăng nhập thất bại!');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Đăng nhập Admin</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Đăng nhập
      </button>
    </form>
  );
}