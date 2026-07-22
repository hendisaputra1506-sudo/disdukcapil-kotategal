import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { fetchApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function ChangePassword() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError('Password baru harus terdiri dari minimal 8 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password baru tidak cocok dengan password baru.');
      return;
    }

    if (currentPassword === newPassword) {
      setError('Password baru tidak boleh sama dengan password saat ini.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetchApi('/api/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      if (res && res.success) {
        setSuccess(res.message || 'Password berhasil diubah. Sesi Anda telah berakhir, silakan login kembali.');
        setTimeout(async () => {
          await logout();
          navigate('/login', { replace: true });
        }, 2000);
      } else {
        setError(res?.message || 'Gagal mengubah password.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat mengubah password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ubah Password</h1>
        <p className="text-sm text-slate-500">Perbarui kata sandi akun administrator Anda secara berkala untuk keamanan.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-slate-500" />
              <CardTitle>Keamanan Akun</CardTitle>
            </div>
            <CardDescription>Pastikan password baru terdiri dari minimal 8 karakter dengan kombinasi huruf dan angka.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
                {success}
              </div>
            )}
            
            <div className="relative">
              <Input
                type={showCurrent ? 'text' : 'password'}
                label="Password Saat Ini"
                placeholder="Masukkan password saat ini"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute bottom-2 right-3 flex h-6 w-6 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showNew ? 'text' : 'password'}
                label="Password Baru"
                placeholder="Masukkan password baru (min 8 karakter)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute bottom-2 right-3 flex h-6 w-6 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirm ? 'text' : 'password'}
                label="Konfirmasi Password Baru"
                placeholder="Ulangi password baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute bottom-2 right-3 flex h-6 w-6 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

          </CardContent>
          <div className="flex items-center justify-end gap-4 border-t border-slate-200 p-6 bg-slate-50 rounded-b-lg">
            <Button variant="secondary" type="button" onClick={() => navigate(-1)} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'MEMPROSES...' : 'Simpan Password'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
