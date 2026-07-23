import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card, CardContent } from '../../components/ui/Card';
import { getBannerById, createBanner, updateBanner } from '../../services/bannerService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function BannerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('active');
  const [displayOrder, setDisplayOrder] = useState('0');

  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImage, setExistingImage] = useState('');

  // Status Load & Submit
  const [isFetchingDetail, setIsFetchingDetail] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load detail for edit mode
  useEffect(() => {
    if (isEdit) {
      const fetchDetail = async () => {
        setIsFetchingDetail(true);
        setError('');
        try {
          const res = await getBannerById(id);
          if (res && res.success && res.data) {
            const data = res.data;
            setTitle(data.title || '');
            setStatus(data.status || 'active');
            setDisplayOrder(data.displayOrder !== undefined ? String(data.displayOrder) : '0');
            setExistingImage(data.image || '');
          } else {
            setError(res?.message || 'Gagal memuat detail banner.');
          }
        } catch (err) {
          setError(err?.data?.message || err?.message || 'Gagal terhubung ke server.');
        } finally {
          setIsFetchingDetail(false);
        }
      };

      fetchDetail();
    }
  }, [id, isEdit]);

  // Handle File Change & Validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format gambar tidak didukung. Harap pilih file JPG, JPEG, PNG, atau WebP.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file gambar banner terlalu besar. Maksimal 5 MB.');
      return;
    }

    setError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Judul banner wajib diisi.');
      return;
    }

    if (!isEdit && !imageFile) {
      setError('Gambar banner wajib diunggah untuk banner baru.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('status', status);
      formData.append('display_order', displayOrder || '0');

      if (imageFile) {
        formData.append('image', imageFile);
      }

      let res;
      if (isEdit) {
        res = await updateBanner(id, formData);
      } else {
        res = await createBanner(formData);
      }

      if (res && res.success) {
        setSuccess(isEdit ? 'Banner berhasil diperbarui.' : 'Banner baru berhasil ditambahkan.');
        setTimeout(() => {
          navigate('/banner');
        }, 1200);
      } else {
        setError(res?.message || 'Gagal menyimpan banner.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menyimpan banner.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPreviewSrc = () => {
    if (imagePreview) return imagePreview;
    if (existingImage) {
      if (existingImage.startsWith('http')) return existingImage;
      const baseDomain = BASE_URL.replace(/\/api\/?$/, '');
      const normalizedPath = existingImage.startsWith('/') ? existingImage : `/${existingImage}`;
      return `${baseDomain}${normalizedPath}`;
    }
    return null;
  };

  if (isFetchingDetail) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">Memuat detail banner...</p>
      </div>
    );
  }

  const previewSrc = getPreviewSrc();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isEdit ? 'Edit Banner Header' : 'Tambah Banner Header Baru'}
          </h1>
          <p className="text-sm text-slate-500">
            {isEdit ? 'Perbarui informasi dan gambar banner.' : 'Tambahkan gambar Header/Hero baru untuk website publik.'}
          </p>
        </div>
        <Link to="/banner">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar
          </Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 border border-green-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Title */}
            <Input
              label="Judul Banner"
              placeholder="Masukkan judul atau identitas banner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Status & Display Order */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Select
                label="Status Tampilan"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Aktif (Ditampilkan Publik)</option>
                <option value="inactive">Tidak Aktif (Disembunyikan)</option>
              </Select>

              <Input
                type="number"
                label="Urutan Tampil (Display Order)"
                placeholder="0"
                min="0"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                helperText="Angka lebih kecil tampil lebih awal (misal: 1, 2, 3)."
              />
            </div>

            {/* Upload Image & Preview */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">
                Gambar Banner {!isEdit && <span className="text-red-600">*</span>}
              </label>
              
              <div className="flex flex-col gap-4 rounded-md border border-slate-300 p-4 bg-slate-50/50">
                <div className="flex h-44 w-full items-center justify-center rounded bg-slate-100 border border-slate-200 overflow-hidden">
                  {previewSrc ? (
                    <img src={previewSrc} alt="Preview Banner" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                      <ImageIcon className="h-10 w-10" />
                      <span className="text-xs">Preview Gambar Banner (16:5)</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-950 cursor-pointer"
                  />
                  <div className="rounded bg-blue-50 p-3 text-xs text-blue-900 border border-blue-100">
                    <p className="font-semibold mb-1">Rekomendasi Spesifikasi Gambar Header:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-blue-800">
                      <li>Ukuran Ideal: <strong>1920 × 600 px</strong> (Rasio 16:5)</li>
                      <li>Format: JPG, JPEG, PNG, WebP</li>
                      <li>Ukuran File Maksimal: <strong>5 MB</strong></li>
                    </ul>
                    {isEdit && <p className="mt-1 text-slate-600">*Biarkan kosong jika tidak ingin mengganti gambar banner.</p>}
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
          <div className="flex items-center justify-end gap-4 border-t border-slate-200 p-6 bg-slate-50 rounded-b-lg">
            <Link to="/banner">
              <Button variant="secondary" type="button" disabled={isSubmitting}>
                Batal
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'MEMPROSES...' : isEdit ? 'Simpan Perubahan' : 'Simpan Banner'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
