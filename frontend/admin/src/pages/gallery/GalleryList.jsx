import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Images, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { getGalleries, deleteGallery } from '../../services/galleryService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function GalleryList() {
  const [galleryList, setGalleryList] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGalleries = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getGalleries({
        page: pagination.page,
        limit: pagination.limit,
        search,
        category: categoryFilter,
      });

      if (res && res.success) {
        setGalleryList(res.data || []);
        if (res.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: res.pagination.total || 0,
            totalPages: res.pagination.totalPages || 1,
          }));
        }
      } else {
        setError(res?.message || 'Gagal mengambil data galeri.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, search, categoryFilter]);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const handleDeleteClick = (photo) => {
    setSelectedPhoto(photo);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPhoto) return;
    setIsDeleting(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await deleteGallery(selectedPhoto.id);
      if (res && res.success) {
        setSuccessMessage(`Foto "${selectedPhoto.title}" berhasil dihapus.`);
        setIsDeleteModalOpen(false);
        setSelectedPhoto(null);
        fetchGalleries();
      } else {
        setError(res?.message || 'Gagal menghapus foto.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menghapus foto.');
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
        month: 'short',
        year: 'numeric',
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

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Galeri</h1>
          <p className="text-sm text-slate-500">Kelola dokumentasi foto kegiatan Disdukcapil Kota Tegal.</p>
        </div>
        <Link to="/gallery/create">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Foto
          </Button>
        </Link>
      </div>

      {/* Notifications */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 border border-green-200">
          {successMessage}
        </div>
      )}

      {/* Filter Box */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Cari foto galeri..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            />
          </div>
          <div className="sm:w-1/3">
            <Select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <option value="">Semua Kategori Galeri</option>
              <option value="5">Dokumentasi</option>
            </Select>
          </div>
        </div>

        {/* Content View */}
        {isLoading ? (
          <div className="flex h-64 w-full flex-col items-center justify-center space-y-3 bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
            <p className="text-sm font-medium text-slate-500">Memuat foto galeri...</p>
          </div>
        ) : galleryList.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryList.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video w-full bg-slate-100 flex items-center justify-center border-b border-slate-200 relative overflow-hidden">
                  {photo.image ? (
                    <img
                      src={getImageSrc(photo.image)}
                      alt={photo.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/logo.png';
                      }}
                    />
                  ) : (
                    <Images className="h-10 w-10 text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
                    <Link to={`/gallery/${photo.id}`}>
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full" title="Lihat Detail">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/gallery/${photo.id}/edit`}>
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full" title="Edit Foto">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      title="Hapus Foto"
                      onClick={() => handleDeleteClick(photo)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-900 line-clamp-1" title={photo.title}>{photo.title}</h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-blue-900">{photo.categoryName || 'Dokumentasi'}</span>
                    <span>{formatDate(photo.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Images}
            title="Belum ada foto galeri"
            description={
              search || categoryFilter
                ? 'Tidak ditemukan foto yang sesuai dengan filter pencarian.'
                : 'Belum ada foto yang ditambahkan. Klik tombol "Tambah Foto" untuk mengunggah.'
            }
            action={
              <Link to="/gallery/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Foto
                </Button>
              </Link>
            }
          />
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
            <span className="text-xs text-slate-500">
              Halaman {pagination.page} dari {pagination.totalPages} ({pagination.total} foto)
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              >
                Sebelumnya
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Hapus Foto Galeri?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin menghapus foto <span className="font-semibold text-slate-900">"{selectedPhoto?.title}"</span>?
          </p>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
            File gambar fisik di penyimpanan server akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
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
