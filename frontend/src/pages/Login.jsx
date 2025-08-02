import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const submit = async e => {
    e.preventDefault();
    await login(name, password);
  };
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto space-y-4">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Login"
        className="w-full p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Hasło"
        className="w-full p-2 border"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white">
        Zaloguj
      </button>
    </form>
  );
}