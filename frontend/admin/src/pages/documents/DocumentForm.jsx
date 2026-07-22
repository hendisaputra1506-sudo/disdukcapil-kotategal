import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { getDocumentById, createDocument, updateDocument } from '../../services/documentService';

export function DocumentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // File State
  const [documentFile, setDocumentFile] = useState(null);
  const [existingFilePath, setExistingFilePath] = useState('');

  // Status Loading & Submit
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
          const res = await getDocumentById(id);
          if (res && res.success && res.data) {
            const data = res.data;
            setTitle(data.title || '');
            setDescription(data.description || '');
            setExistingFilePath(data.filePath || '');
          } else {
            setError(res?.message || 'Gagal memuat detail dokumen.');
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

    const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.rtf'];
    const fileName = file.name.toLowerCase();
    const isAllowed = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isAllowed) {
      setError('Format file tidak didukung. Harap pilih file PDF, DOC, DOCX, XLS, XLSX, TXT, atau RTF.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file dokumen terlalu besar. Maksimal 10 MB.');
      return;
    }

    setError('');
    setDocumentFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Judul dokumen wajib diisi.');
      return;
    }

    if (!isEdit && !documentFile) {
      setError('File dokumen wajib diunggah untuk dokumen baru.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());

      if (documentFile) {
        formData.append('file', documentFile);
      }

      let res;
      if (isEdit) {
        res = await updateDocument(id, formData);
      } else {
        res = await createDocument(formData);
      }

      if (res && res.success) {
        setSuccess(isEdit ? 'Dokumen berhasil diperbarui.' : 'Dokumen baru berhasil ditambahkan.');
        setTimeout(() => {
          navigate('/documents');
        }, 1200);
      } else {
        setError(res?.message || 'Gagal menyimpan dokumen.');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Terjadi kesalahan saat menyimpan dokumen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileName = (path) => {
    if (!path) return '';
    return path.split('/').pop() || path;
  };

  if (isFetchingDetail) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">Memuat detail dokumen...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isEdit ? 'Edit Dokumen Pelayanan' : 'Tambah Dokumen Pelayanan Baru'}
          </h1>
          <p className="text-sm text-slate-500">
            {isEdit ? 'Perbarui judul, deskripsi, atau ganti file dokumen.' : 'Unggah formulir & dokumen PDF baru yang dapat diunduh masyarakat.'}
          </p>
        </div>
        <Link to="/documents">
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
              label="Judul Dokumen"
              placeholder="Contoh: Formulir Permohonan KTP-el Online 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">Deskripsi Dokumen</label>
              <textarea
                rows={4}
                className="block w-full rounded-md border border-slate-300 p-3 text-sm text-slate-900 focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
                placeholder="Masukkan keterangan atau panduan mengenai dokumen ini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Upload File Section */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-900">
                File Dokumen Pelayanan {!isEdit && <span className="text-red-600">*</span>}
              </label>
              
              <div className="flex flex-col gap-4 rounded-md border border-slate-300 p-4 bg-slate-50/50">
                {isEdit && existingFilePath && !documentFile && (
                  <div className="flex items-center gap-3 p-3 rounded bg-blue-50 border border-blue-100 text-blue-900 text-sm">
                    <FileText className="h-5 w-5 text-blue-700 shrink-0" />
                    <span className="truncate">File Saat Ini: <strong>{getFileName(existingFilePath)}</strong></span>
                  </div>
                )}

                {documentFile && (
                  <div className="flex items-center gap-3 p-3 rounded bg-green-50 border border-green-100 text-green-900 text-sm">
                    <FileText className="h-5 w-5 text-green-700 shrink-0" />
                    <span className="truncate">File Terpilih: <strong>{documentFile.name}</strong> ({ (documentFile.size / (1024 * 1024)).toFixed(2) } MB)</span>
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.rtf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-950 cursor-pointer"
                  />
                  <div className="rounded bg-blue-50 p-3 text-xs text-blue-900 border border-blue-100">
                    <p className="font-semibold mb-1">Ketentuan Upload Dokumen:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-blue-800">
                      <li>Format Diizinkan: <strong>PDF, DOC, DOCX, XLS, XLSX, TXT, RTF</strong></li>
                      <li>Ukuran File Maksimal: <strong>10 MB</strong></li>
                      <li>Strict Security: File executable (.exe, .js, .php, .sh) dilarang demi keamanan server</li>
                    </ul>
                    {isEdit && <p className="mt-1 text-slate-600">*Biarkan kosong jika tidak ingin mengunggah file baru.</p>}
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
          <div className="flex items-center justify-end gap-4 border-t border-slate-200 p-6 bg-slate-50 rounded-b-lg">
            <Link to="/documents">
              <Button variant="secondary" type="button" disabled={isSubmitting}>
                Batal
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'MEMPROSES...' : isEdit ? 'Simpan Perubahan' : 'Simpan Dokumen'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
