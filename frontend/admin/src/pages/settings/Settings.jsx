import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { getSettings, updateSettings } from '../../services/settingsService';

export function Settings() {
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    phone: '',
    facebook: '',
    instagram: '',
    x: '',
    tiktok: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        if (res?.success && res.data) {
          setFormData({
            address: res.data.address || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            facebook: res.data.facebook_url || '',
            instagram: res.data.instagram_url || '',
            x: res.data.youtube_url || '', // We mapped this temporarily
            tiktok: '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch settings', error);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateSettings(formData);
      if (res?.success) {
        alert('Pengaturan berhasil disimpan!');
      } else {
        alert(res?.message || 'Gagal menyimpan pengaturan.');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan pengaturan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Website</h1>
        <p className="text-sm text-slate-500">Kelola informasi dasar dan kontak website publik.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-slate-500" />
              <CardTitle>Informasi Umum</CardTitle>
            </div>
            <CardDescription>Ubah logo dan informasi kontak instansi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">Logo Website</label>
              <div className="flex items-center gap-6 rounded-md border border-slate-200 p-4 bg-slate-50">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm">
                  <ImageIcon className="h-10 w-10 text-slate-300" />
                </div>
                <div className="space-y-3">
                  <Input type="file" accept="image/*" className="hidden" id="logo-upload" />
                  <Button type="button" variant="secondary" onClick={() => document.getElementById('logo-upload').click()}>
                    Ganti Logo
                  </Button>
                  <p className="text-xs text-slate-500">Format: PNG dengan background transparan. Ukuran max 1MB.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">Alamat Lengkap</label>
              <textarea
                name="address"
                className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Nomor Telepon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="border-b border-slate-200 bg-slate-50/50">
            <CardTitle>Media Sosial</CardTitle>
            <CardDescription>Tautan media sosial resmi Disdukcapil.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <Input
              label="Facebook URL"
              name="facebook"
              type="url"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />
            <Input
              label="Instagram URL"
              name="instagram"
              type="url"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />
            <Input
              label="X URL"
              name="x"
              type="url"
              value={formData.x}
              onChange={handleChange}
              placeholder="https://x.com/..."
            />
            <Input
              label="TikTok URL"
              name="tiktok"
              type="url"
              value={formData.tiktok}
              onChange={handleChange}
              placeholder="https://tiktok.com/..."
            />
          </CardContent>
          <div className="flex items-center justify-end gap-4 border-t border-slate-200 p-6 bg-slate-50 rounded-b-lg">
            <Button type="submit">
              Simpan Perubahan
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
