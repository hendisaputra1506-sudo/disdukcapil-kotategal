import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, Tag, Images } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { getGalleryById, deleteGallery } from '../../services/galleryService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function GalleryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gallery, setGallery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // State Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await getGalleryById(id);
        if (res && res.success && res.data) {
          setGallery(res.data);
        } else {
          setError(res?.message || 'Foto galeri tidak ditemukan.');
        }
      } catch (err) {
        setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat memuat detail galeri.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const confirmDelete = async () => {
    if (!gallery) return;
    setIsDeleting(true);
    try {
      const res = await deleteGallery(gallery.id);
      if (res && res.success) {
        setIsDeleteModalOpen(false);
        navigate('/gallery', { replace: true });
      } else {
        setError(res?.message || 'Gagal menghapus galeri.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menghapus galeri.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getImageSrc = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${BASE_URL}${path}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">Memuat detail galeri...</p>
      </div>
    );
  }

  if (error || !gallery) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <Link to="/gallery">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Kelola Galeri
            </Button>
          </Link>
        </div>
        <div className="rounded-md bg-red-50 p-6 text-center text-red-600 border border-red-200">
          <h3 className="font-semibold text-lg mb-1">Terjadi Kesalahan</h3>
          <p className="text-sm mb-4">{error || 'Foto galeri tidak ditemukan.'}</p>
          <Link to="/gallery">
            <Button variant="secondary">Kembali ke Galeri</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <Link to="/gallery" className="inline-flex items-center text-xs font-semibold text-blue-900 hover:underline mb-2">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Kembali ke Kelola Galeri
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{gallery.title}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to={`/gallery/${gallery.id}/edit`}>
            <Button variant="secondary" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-1">
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-semibold text-slate-700">{gallery.categoryName || 'Dokumentasi'}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Diupload: {formatDate(gallery.createdAt)}</span>
            </div>
          </div>

          {/* Gallery Image Display */}
          {gallery.image ? (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100 max-h-[500px]">
              <img
                src={getImageSrc(gallery.image)}
                alt={gallery.title}
                className="w-full h-full object-contain bg-slate-900/5 max-h-[500px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/logo.png';
                }}
              />
            </div>
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-400">
              <Images className="h-12 w-12" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Confirmation Delete */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Hapus Foto Galeri?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin menghapus foto <span className="font-semibold text-slate-900">"{gallery.title}"</span>?
          </p>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
            Tindakan ini tidak dapat dibatalkan. File gambar fisik di penyimpanan server akan dihapus permanen.
          </p>
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'MENGHAPUS...' : 'Ya, Hapus Foto'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
