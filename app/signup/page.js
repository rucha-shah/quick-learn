// app/signup/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert('Signup successful, please log in.');
      router.push('/login');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup for QuickLearn</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
