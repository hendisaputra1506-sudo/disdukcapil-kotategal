import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Jika sudah terautentikasi (mempunyai cookie valid), alihkan langsung ke dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(email, password);
      if (data && data.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setError(data?.message || 'Login gagal, periksa email dan password Anda.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Gagal terhubung ke server backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="text-center">
          <img 
            src="/logo.png" 
            alt="Logo Disdukcapil" 
            className="mx-auto mb-4 h-16 w-auto object-contain"
          />
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            ADMIN PANEL
          </h2>
          <p className="text-sm text-slate-500">
            DISDUKCAPIL KOTA TEGAL
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Masukkan email administrator"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bottom-2 right-3 flex h-6 w-6 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'MEMPROSES...' : 'MASUK'}
          </Button>
        </form>
      </div>
    </div>
  );
}
