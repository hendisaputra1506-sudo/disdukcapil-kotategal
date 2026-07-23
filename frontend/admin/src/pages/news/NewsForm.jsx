import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Bold, Italic, Underline, List, Link as LinkIcon, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card, CardContent } from '../../components/ui/Card';
import { getNewsById, createNews, updateNews } from '../../services/newsService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function NewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('1'); // Default '1' (Informasi)
  const [status, setStatus] = useState('draft');
  const [publishedAt, setPublishedAt] = useState('');

  // Thumbnail State
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [existingThumbnail, setExistingThumbnail] = useState('');

  // Status Load & Submit
  const [isFetchingDetail, setIsFetchingDetail] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load existing news detail for Edit mode
  useEffect(() => {
    if (isEdit) {
      const fetchDetail = async () => {
        setIsFetchingDetail(true);
        setError('');
        try {
          const res = await getNewsById(id);
          if (res && res.success && res.data) {
            const data = res.data;
            setTitle(data.title || '');
            setSlug(data.slug || '');
            setExcerpt(data.excerpt || '');
            setContent(data.content || '');
            setCategoryId(data.categoryId ? String(data.categoryId) : '1');
            setStatus(data.status || 'draft');
            setExistingThumbnail(data.thumbnail || '');

            if (data.publishedAt) {
              // Format YYYY-MM-DD for date input
              const d = new Date(data.publishedAt);
              const formattedDate = d.toISOString().split('T')[0];
              setPublishedAt(formattedDate);
            }
          } else {
            setError(res?.message || 'Gagal memuat detail berita.');
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

  // Handle Title Change & Auto Slug Preview
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEdit) {
      const generated = newTitle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      setSlug(generated);
    }
  };

  // Handle Thumbnail File Select & Preview Validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi Tipe File
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format file tidak didukung. Harap pilih gambar JPG, JPEG, PNG, atau WebP.');
      return;
    }

    // Validasi Ukuran File (Maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file thumbnail terlalu besar. Maksimal 5 MB.');
      return;
    }

    setError('');
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Judul berita wajib diisi.');
      return;
    }

    if (!content.trim()) {
      setError('Isi berita wajib diisi.');
      return;
    }

    if (!isEdit && !thumbnailFile) {
      setError('Thumbnail berita wajib diunggah untuk berita baru.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('excerpt', excerpt.trim());
      formData.append('content', content.trim());
      formData.append('category_id', categoryId);
      formData.append('status', status);

      if (publishedAt) {
        formData.append('publishedAt', publishedAt);
      }

      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }

      let res;
      if (isEdit) {
        res = await updateNews(id, formData);
      } else {
        res = await createNews(formData);
      }

      if (res && res.success) {
        setSuccess(isEdit ? 'Berita berhasil diperbarui.' : 'Berita baru berhasil dibuat.');
        setTimeout(() => {
          navigate('/news');
        }, 1200);
      } else {
        setError(res?.message || 'Gagal menyimpan berita.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menyimpan berita.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPreviewImageSrc = () => {
    if (thumbnailPreview) return thumbnailPreview;
    if (existingThumbnail) {
      if (existingThumbnail.startsWith('http')) return existingThumbnail;
      const baseDomain = BASE_URL.replace(/\/api\/?$/, '');
      const normalizedPath = existingThumbnail.startsWith('/') ? existingThumbnail : `/${existingThumbnail}`;
      return `${baseDomain}${normalizedPath}`;
    }
    return null;
  };

  if (isFetchingDetail) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">Memuat detail berita...</p>
      </div>
    );
  }

  const previewSrc = getPreviewImageSrc();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isEdit ? 'Edit Berita' : 'Tambah Berita Baru'}
          </h1>
          <p className="text-sm text-slate-500">
            {isEdit ? 'Perbarui informasi dan konten berita.' : 'Tambahkan artikel / berita baru ke website publik Disdukcapil.'}
          </p>
        </div>
        <Link to="/news">
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
              label="Judul Berita"
              placeholder="Masukkan judul berita"
              value={title}
              onChange={handleTitleChange}
              required
            />
            
            {/* Slug Preview */}
            <Input
              label="Slug URL"
              placeholder="judul-berita"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled
              helperText="URL unik berita yang dihasilkan otomatis oleh backend."
            />

            {/* Excerpt */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">
                Ringkasan / Excerpt
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors"
                placeholder="Masukkan ringkasan singkat berita (opsional)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>

            {/* Category & Status */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Select
                label="Kategori Berita"
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="1">Informasi</option>
                <option value="2">Pelayanan</option>
                <option value="3">Pengumuman</option>
                <option value="4">Kegiatan</option>
              </Select>

              <Select
                label="Status Publikasi"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="draft">Draft (Belum Dipublikasi)</option>
                <option value="published">Published (Tampil Publik)</option>
              </Select>
            </div>

            {/* Thumbnail Upload & Preview */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">
                Thumbnail Berita {!isEdit && <span className="text-red-600">*</span>}
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-md border border-slate-300 p-4 bg-slate-50/50">
                <div className="flex h-24 w-36 items-center justify-center rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  {previewSrc ? (
                    <img src={previewSrc} alt="Preview Thumbnail" className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                <div className="space-y-2 flex-1">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-950 cursor-pointer"
                  />
                  <p className="text-xs text-slate-500">
                    Format yang diperbolehkan: JPG, JPEG, PNG, WebP. Maksimal 5 MB.
                    {isEdit && ' Biarkan kosong jika tidak ingin mengganti thumbnail.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">
                Isi Berita <span className="text-red-600">*</span>
              </label>
              <div className="rounded-md border border-slate-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-900 focus-within:border-transparent transition-colors">
                <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
                  <button type="button" className="rounded p-1.5 text-slate-600 hover:bg-slate-200" title="Bold">
                    <Bold className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 text-slate-600 hover:bg-slate-200" title="Italic">
                    <Italic className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 text-slate-600 hover:bg-slate-200" title="Underline">
                    <Underline className="h-4 w-4" />
                  </button>
                  <div className="mx-1 h-5 w-px bg-slate-300" />
                  <button type="button" className="rounded p-1.5 text-slate-600 hover:bg-slate-200" title="Bulleted List">
                    <List className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded p-1.5 text-slate-600 hover:bg-slate-200" title="Link">
                    <LinkIcon className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  className="flex min-h-[300px] w-full border-0 bg-transparent px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                  placeholder="Tuliskan isi berita lengkap di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Published At Date Input */}
            {status === 'published' && (
              <Input
                type="date"
                label="Tanggal Publikasi"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                helperText="Kosongkan jika ingin menggunakan waktu saat ini."
              />
            )}

          </CardContent>
          <div className="flex items-center justify-end gap-4 border-t border-slate-200 p-6 bg-slate-50 rounded-b-lg">
            <Link to="/news">
              <Button variant="secondary" type="button" disabled={isSubmitting}>
                Batal
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'MEMPROSES...' : isEdit ? 'Simpan Perubahan' : 'Terbitkan / Simpan Berita'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
