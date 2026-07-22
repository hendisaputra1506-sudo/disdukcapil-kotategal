import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, FileText, RefreshCw, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { getNews, deleteNews } from '../../services/newsService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // State Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch news data from backend API
  const fetchNewsData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getNews({
        page,
        limit: 10,
        search: search.trim(),
        category: categoryFilter,
        status: statusFilter,
      });

      if (res && res.success) {
        setNewsList(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } else {
        setError(res?.message || 'Gagal mengambil data berita.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  }, [page, search, categoryFilter, statusFilter]);

  useEffect(() => {
    fetchNewsData();
  }, [fetchNewsData]);

  // Handle Search Input Change (Reset Page to 1)
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Handle Category Filter Change
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  // Handle Status Filter Change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  // Handle Delete Modal
  const handleDeleteClick = (news) => {
    setSelectedNews(news);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedNews) return;
    setIsDeleting(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await deleteNews(selectedNews.id);
      if (res && res.success) {
        setSuccessMessage(`Berita "${selectedNews.title}" berhasil dihapus.`);
        setIsDeleteModalOpen(false);
        setSelectedNews(null);
        fetchNewsData();
      } else {
        setError(res?.message || 'Gagal menghapus berita.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menghapus berita.');
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
    return `${BASE_URL}${path}`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Berita</h1>
          <p className="text-sm text-slate-500">Kelola informasi dan artikel berita yang ditampilkan pada website publik.</p>
        </div>
        <Link to="/news/create">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Berita
          </Button>
        </Link>
      </div>

      {/* Banner Notifikasi Error / Sukses */}
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
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Cari berita berdasarkan judul/konten..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2 sm:w-1/2 lg:w-1/3">
            <Select className="flex-1" value={categoryFilter} onChange={handleCategoryChange}>
              <option value="">Semua Kategori</option>
              <option value="Informasi">Informasi</option>
              <option value="Pelayanan">Pelayanan</option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Kegiatan">Kegiatan</option>
            </Select>
            <Select className="flex-1" value={statusFilter} onChange={handleStatusChange}>
              <option value="">Semua Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </Select>
          </div>
        </div>

        {/* State Loading */}
        {isLoading ? (
          <div className="flex h-64 w-full flex-col items-center justify-center space-y-3 bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
            <p className="text-sm text-slate-500 font-medium">Memuat data berita...</p>
          </div>
        ) : newsList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">No</TableHead>
                <TableHead className="w-24">Thumbnail</TableHead>
                <TableHead>Judul Berita</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Publikasi</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsList.map((item, index) => {
                const itemNumber = (pagination.page - 1) * pagination.limit + index + 1;
                const isPublished = item.status === 'published';

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-slate-900">{itemNumber}</TableCell>
                    <TableCell>
                      {item.thumbnail ? (
                        <img
                          src={getImageSrc(item.thumbnail)}
                          alt={item.title}
                          className="h-12 w-16 rounded object-cover border border-slate-200 bg-slate-100"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/logo.png';
                          }}
                        />
                      ) : (
                        <div className="flex h-12 w-16 items-center justify-center rounded bg-slate-100 border border-slate-200">
                          <FileText className="h-5 w-5 text-slate-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900 line-clamp-2">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{item.slug}</div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        {item.category || 'Umum'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={isPublished ? 'success' : 'default'}>
                        {isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {isPublished ? formatDate(item.publishedAt) : formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link to={`/news/${item.id}`} title="Lihat Detail">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-900 hover:bg-blue-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/news/${item.id}/edit`} title="Edit Berita">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleDeleteClick(item)}
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
            icon={FileText}
            title="Tidak ada berita ditemukan"
            description={
              search || categoryFilter || statusFilter
                ? 'Tidak ada berita yang cocok dengan kriteria pencarian / filter Anda.'
                : 'Belum ada berita yang ditambahkan. Klik tombol "Tambah Berita" untuk membuat berita pertama.'
            }
            action={
              <Link to="/news/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Berita
                </Button>
              </Link>
            }
          />
        )}

        {/* Control Pagination */}
        {!isLoading && newsList.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 p-4 gap-4">
            <p className="text-sm text-slate-500">
              Menampilkan {pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} –{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} dari {pagination.total} berita
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Sebelumnya
              </Button>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-700">
                Halaman {pagination.page} / {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Hapus Berita?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin menghapus berita <span className="font-semibold text-slate-900">"{selectedNews?.title}"</span>?
          </p>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
            Peringatan: Berita dan file thumbnail fisik terkait akan dihapus secara permanen dari database server.
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
              {isDeleting ? 'MENGHAPUS...' : 'Ya, Hapus Berita'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
