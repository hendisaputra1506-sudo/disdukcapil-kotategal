import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Image as ImageIcon, ArrowUpDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { getBanners, deleteBanner } from '../../services/bannerService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function BannerList() {
  const [bannersList, setBannersList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBannersData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getBanners({ status: statusFilter });
      if (res && res.success) {
        setBannersList(res.data || []);
      } else {
        setError(res?.message || 'Gagal mengambil data banner.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchBannersData();
  }, [fetchBannersData]);

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBanner) return;
    setIsDeleting(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await deleteBanner(selectedBanner.id);
      if (res && res.success) {
        setSuccessMessage(`Banner "${selectedBanner.title}" berhasil dihapus.`);
        setIsDeleteModalOpen(false);
        setSelectedBanner(null);
        fetchBannersData();
      } else {
        setError(res?.message || 'Gagal menghapus banner.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menghapus banner.');
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
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getImageSrc = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseDomain = BASE_URL.replace(/\/api\/?$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseDomain}${normalizedPath}`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Banner</h1>
          <p className="text-sm text-slate-500">Kelola gambar Header/Hero yang ditampilkan pada halaman utama website publik.</p>
        </div>
        <Link to="/banner/create">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Banner
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

      {/* Card Box */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        {/* Filter Area */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div className="w-full sm:w-64">
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Semua Status Banner</option>
              <option value="active">Aktif (Tampil Publik)</option>
              <option value="inactive">Tidak Aktif</option>
            </Select>
          </div>
          <p className="hidden text-xs text-slate-400 sm:block">
            *Banner diurutkan berdasarkan Urutan Tampil (display_order).
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex h-64 w-full flex-col items-center justify-center space-y-3 bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
            <p className="text-sm font-medium text-slate-500">Memuat data banner...</p>
          </div>
        ) : bannersList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">No</TableHead>
                <TableHead className="w-36">Preview Gambar</TableHead>
                <TableHead>Judul Banner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-28 text-center">Urutan Tampil</TableHead>
                <TableHead>Tanggal Dibuat</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bannersList.map((banner, index) => {
                const isActive = banner.status === 'active';

                return (
                  <TableRow key={banner.id}>
                    <TableCell className="font-medium text-slate-900">{index + 1}</TableCell>
                    <TableCell>
                      {banner.image ? (
                        <img
                          src={getImageSrc(banner.image)}
                          alt={banner.title}
                          className="h-14 w-28 rounded object-cover border border-slate-200 bg-slate-100"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/logo.png';
                          }}
                        />
                      ) : (
                        <div className="flex h-14 w-28 items-center justify-center rounded bg-slate-100 border border-slate-200">
                          <ImageIcon className="h-6 w-6 text-slate-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{banner.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={isActive ? 'success' : 'default'}>
                        {isActive ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-mono font-medium text-slate-700">
                      <span className="inline-flex items-center rounded bg-slate-100 px-2 py-1 text-xs">
                        <ArrowUpDown className="mr-1 h-3 w-3 text-slate-400" />
                        {banner.displayOrder}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {formatDate(banner.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link to={`/banner/${banner.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleDeleteClick(banner)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={ImageIcon}
            title="Tidak ada banner ditemukan"
            description={
              statusFilter
                ? 'Tidak ada banner dengan status yang dipilih.'
                : 'Belum ada gambar banner yang ditambahkan. Klik tombol "Tambah Banner" untuk membuat banner pertama.'
            }
            action={
              <Link to="/banner/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Banner
                </Button>
              </Link>
            }
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Hapus Banner Header?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin menghapus banner <span className="font-semibold text-slate-900">"{selectedBanner?.title}"</span>?
          </p>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
            Gambar banner fisik juga akan dihapus dari penyimpanan server. Tindakan ini tidak dapat dibatalkan.
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
              {isDeleting ? 'MENGHAPUS...' : 'Ya, Hapus Banner'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
