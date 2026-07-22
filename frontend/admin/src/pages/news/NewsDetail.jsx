import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, Tag, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { getNewsById, deleteNews } from '../../services/newsService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
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
        const res = await getNewsById(id);
        if (res && res.success && res.data) {
          setNews(res.data);
        } else {
          setError(res?.message || 'Berita tidak ditemukan.');
        }
      } catch (err) {
        setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat memuat berita.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const confirmDelete = async () => {
    if (!news) return;
    setIsDeleting(true);
    try {
      const res = await deleteNews(news.id);
      if (res && res.success) {
        setIsDeleteModalOpen(false);
        navigate('/news', { replace: true });
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
        <p className="text-sm font-medium text-slate-600">Memuat detail berita...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <Link to="/news">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar Berita
            </Button>
          </Link>
        </div>
        <div className="rounded-md bg-red-50 p-6 text-center text-red-600 border border-red-200">
          <h3 className="font-semibold text-lg mb-1">Terjadi Kesalahan</h3>
          <p className="text-sm mb-4">{error || 'Berita tidak ditemukan.'}</p>
          <Link to="/news">
            <Button variant="secondary">Kembali ke Daftar</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isPublished = news.status === 'published';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <Link to="/news" className="inline-flex items-center text-xs font-semibold text-blue-900 hover:underline mb-2">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Kembali ke Daftar Berita
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 line-clamp-2">{news.title}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to={`/news/${news.id}/edit`}>
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
              <span className="font-semibold text-slate-700">{news.category || 'Umum'}</span>
            </div>
            <span className="text-slate-300">•</span>
            <Badge variant={isPublished ? 'success' : 'default'}>
              {isPublished ? 'Published' : 'Draft'}
            </Badge>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {isPublished
                  ? `Dipublikasi: ${formatDate(news.publishedAt)}`
                  : `Dibuat: ${formatDate(news.createdAt)}`}
              </span>
            </div>
          </div>

          {/* Thumbnail Image */}
          {news.thumbnail && (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100 max-h-96">
              <img
                src={getImageSrc(news.thumbnail)}
                alt={news.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/logo.png';
                }}
              />
            </div>
          )}

          {/* Excerpt */}
          {news.excerpt && (
            <div className="rounded-md bg-slate-50 p-4 border-l-4 border-blue-900 text-sm text-slate-700 italic">
              "{news.excerpt}"
            </div>
          )}

          {/* Article Content */}
          <div className="prose max-w-none text-slate-800 text-sm leading-relaxed space-y-4 pt-2">
            {news.content ? (
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            ) : (
              <p className="text-slate-400 italic">Tidak ada konten berita.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal Confirmation Delete */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Hapus Berita?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin menghapus berita <span className="font-semibold text-slate-900">"{news.title}"</span>?
          </p>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
            Tindakan ini tidak dapat dibatalkan. File thumbnail dan data berita akan dihapus permanen.
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
