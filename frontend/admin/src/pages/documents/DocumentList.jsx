import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, FileText, Download, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { getDocuments, deleteDocument, getDocumentDownloadUrl } from '../../services/documentService';

export function DocumentList() {
  const [documentsList, setDocumentsList] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getDocuments({
        page: pagination.page,
        limit: pagination.limit,
        search,
      });

      if (res && res.success) {
        setDocumentsList(res.data || []);
        if (res.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: res.pagination.total || 0,
            totalPages: res.pagination.totalPages || 1,
          }));
        }
      } else {
        setError(res?.message || 'Gagal mengambil daftar dokumen.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, search]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDeleteClick = (doc) => {
    setSelectedDocument(doc);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDocument) return;
    setIsDeleting(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await deleteDocument(selectedDocument.id);
      if (res && res.success) {
        setSuccessMessage(`Dokumen "${selectedDocument.title}" berhasil dihapus.`);
        setIsDeleteModalOpen(false);
        setSelectedDocument(null);
        fetchDocuments();
      } else {
        setError(res?.message || 'Gagal menghapus dokumen.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menghapus dokumen.');
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

  const getFileName = (filePath) => {
    if (!filePath) return 'dokumen.pdf';
    return filePath.split('/').pop() || 'dokumen.pdf';
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Dokumen Pelayanan</h1>
          <p className="text-sm text-slate-500">Kelola formulir & dokumen PDF pelayanan publik Disdukcapil Kota Tegal.</p>
        </div>
        <Link to="/documents/create">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Dokumen
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

      {/* Main Card Box */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        {/* Search Bar */}
        <div className="border-b border-slate-200 p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Cari dokumen pelayanan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            />
          </div>
        </div>

        {/* Content Table / Loading / Empty */}
        {isLoading ? (
          <div className="flex h-64 w-full flex-col items-center justify-center space-y-3 bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
            <p className="text-sm font-medium text-slate-500">Memuat daftar dokumen...</p>
          </div>
        ) : documentsList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">No</TableHead>
                <TableHead>Nama Dokumen</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Nama File</TableHead>
                <TableHead>Tanggal Upload</TableHead>
                <TableHead className="w-32 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentsList.map((doc, index) => {
                const itemNumber = (pagination.page - 1) * pagination.limit + index + 1;
                const fileName = getFileName(doc.filePath);
                const downloadUrl = getDocumentDownloadUrl(doc.id);

                return (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium text-slate-900">{itemNumber}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{doc.title}</div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 max-w-xs">
                      <p className="line-clamp-2">{doc.description || '-'}</p>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-blue-900">
                      <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 border border-blue-100">
                        <FileText className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                        <span className="truncate max-w-[150px]">{fileName}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {formatDate(doc.uploadedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <a href={downloadUrl} target="_blank" rel="noopener noreferrer" title="Unduh File">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-700 hover:bg-green-50">
                            <Download className="h-4 w-4" />
                          </Button>
                        </a>
                        <Link to={`/documents/${doc.id}`} title="Lihat Detail">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-900 hover:bg-blue-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/documents/${doc.id}/edit`} title="Edit Dokumen">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          title="Hapus Dokumen"
                          onClick={() => handleDeleteClick(doc)}
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
            title="Belum ada dokumen"
            description={
              search
                ? 'Tidak ditemukan dokumen yang sesuai dengan kata kunci pencarian.'
                : 'Belum ada dokumen yang ditambahkan. Klik tombol "Tambah Dokumen" untuk mengunggah.'
            }
            action={
              <Link to="/documents/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Dokumen
                </Button>
              </Link>
            }
          />
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 p-4">
            <span className="text-xs text-slate-500">
              Menampilkan Halaman {pagination.page} dari {pagination.totalPages} ({pagination.total} dokumen)
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
        title="Hapus Dokumen Pelayanan?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin menghapus dokumen <span className="font-semibold text-slate-900">"{selectedDocument?.title}"</span>?
          </p>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
            File dokumen fisik di penyimpanan server akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
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
              {isDeleting ? 'MENGHAPUS...' : 'Ya, Hapus Dokumen'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
