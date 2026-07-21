import React, { useState, useRef } from 'react';
import { Send, UploadCloud, AlertCircle, Loader2, FileText, X } from 'lucide-react';
import Button from '../ui/Button';
import ComplaintSuccess from './ComplaintSuccess';

const KATEGORI_OPTIONS = [
  "Pelayanan KTP",
  "Kartu Keluarga",
  "Akta Kelahiran",
  "Akta Kematian",
  "Identitas Anak (KIA)",
  "Administrasi",
  "Lainnya"
];

const ComplaintForm = () => {
  const fileInputRef = useRef(null);

  // States
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    email: '',
    kategori: '',
    judul: '',
    isi: '',
    lampiran: null,
    persetujuan: false
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [complaintNumber, setComplaintNumber] = useState('');

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Hapus error field saat user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ekstensi
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, lampiran: 'Format file tidak didukung (Gunakan JPG, PNG, atau PDF)' }));
        return;
      }
      // Validasi ukuran (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, lampiran: 'Ukuran file maksimal 2 MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, lampiran: file }));
      setErrors(prev => ({ ...prev, lampiran: null }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, lampiran: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nama.trim()) newErrors.nama = 'Nama lengkap wajib diisi.';
    
    if (!formData.telepon.trim()) {
      newErrors.telepon = 'Nomor HP wajib diisi.';
    } else if (!/^[0-9]+$/.test(formData.telepon)) {
      newErrors.telepon = 'Nomor HP hanya boleh berisi angka.';
    } else if (formData.telepon.length < 10 || formData.telepon.length > 15) {
      newErrors.telepon = 'Nomor HP harus antara 10 - 15 digit.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
    }

    if (!formData.kategori) newErrors.kategori = 'Pilih salah satu kategori pengaduan.';
    if (!formData.judul.trim()) newErrors.judul = 'Judul pengaduan wajib diisi.';
    
    if (!formData.isi.trim()) {
      newErrors.isi = 'Isi pengaduan wajib diisi.';
    } else if (formData.isi.trim().length < 20) {
      newErrors.isi = 'Isi pengaduan minimal 20 karakter.';
    }

    if (!formData.persetujuan) newErrors.persetujuan = 'Anda wajib menyetujui pernyataan ini.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');

    // MOCK API CALL (Simulasi Loading 1-2 detik)
    setTimeout(() => {
      try {
        // Simulasi Generate Nomor Pengaduan
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const ticket = `PGD-${dateStr}-${randomNum}`;
        
        setComplaintNumber(ticket);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      nama: '', telepon: '', email: '', kategori: '', judul: '', isi: '', lampiran: null, persetujuan: false
    });
    setErrors({});
    setStatus('idle');
    setComplaintNumber('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------------------------------------------------
  // Render Success State
  // ---------------------------------------------------------
  if (status === 'success') {
    return <ComplaintSuccess complaintNumber={complaintNumber} onReset={handleReset} />;
  }

  // ---------------------------------------------------------
  // Render Form State
  // ---------------------------------------------------------
  return (
    <div className="bg-white p-6 md:p-8 rounded-card border border-border-subtle shadow-sm">
      <h3 className="text-xl md:text-2xl font-bold text-brand-secondary mb-6 border-b border-border-subtle pb-4">
        Formulir Pengaduan Online
      </h3>

      {status === 'error' && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex gap-3 items-start">
          <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-rose-800">Gagal Mengirim Pengaduan</h4>
            <p className="text-sm text-rose-600 mt-1">Terjadi kesalahan pada sistem. Silakan coba kembali beberapa saat lagi.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Row 1: Nama & HP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="nama" className="text-sm font-bold text-brand-secondary">Nama Lengkap <span className="text-rose-500">*</span></label>
            <input 
              type="text" id="nama" name="nama"
              value={formData.nama} onChange={handleChange}
              placeholder="Sesuai KTP"
              className={`w-full px-4 py-2.5 rounded-button border focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm ${errors.nama ? 'border-rose-500 bg-rose-50' : 'border-border-subtle bg-gray-50'}`}
              disabled={status === 'loading'}
            />
            {errors.nama && <span className="text-xs text-rose-500 font-medium">{errors.nama}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="telepon" className="text-sm font-bold text-brand-secondary">Nomor WhatsApp / HP <span className="text-rose-500">*</span></label>
            <input 
              type="tel" id="telepon" name="telepon"
              value={formData.telepon} onChange={handleChange}
              placeholder="Contoh: 081234567890"
              className={`w-full px-4 py-2.5 rounded-button border focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm ${errors.telepon ? 'border-rose-500 bg-rose-50' : 'border-border-subtle bg-gray-50'}`}
              disabled={status === 'loading'}
            />
            {errors.telepon && <span className="text-xs text-rose-500 font-medium">{errors.telepon}</span>}
          </div>
        </div>

        {/* Row 2: Email & Kategori */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-brand-secondary">Alamat Email <span className="text-rose-500">*</span></label>
            <input 
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange}
              placeholder="email@contoh.com"
              className={`w-full px-4 py-2.5 rounded-button border focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-border-subtle bg-gray-50'}`}
              disabled={status === 'loading'}
            />
            {errors.email && <span className="text-xs text-rose-500 font-medium">{errors.email}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="kategori" className="text-sm font-bold text-brand-secondary">Kategori Pengaduan <span className="text-rose-500">*</span></label>
            <select 
              id="kategori" name="kategori"
              value={formData.kategori} onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-button border focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm appearance-none ${errors.kategori ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-border-subtle bg-gray-50 text-gray-700'}`}
              disabled={status === 'loading'}
            >
              <option value="" disabled>-- Pilih Kategori --</option>
              {KATEGORI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors.kategori && <span className="text-xs text-rose-500 font-medium">{errors.kategori}</span>}
          </div>
        </div>

        {/* Row 3: Judul */}
        <div className="flex flex-col gap-2">
          <label htmlFor="judul" className="text-sm font-bold text-brand-secondary">Judul Pengaduan <span className="text-rose-500">*</span></label>
          <input 
            type="text" id="judul" name="judul"
            value={formData.judul} onChange={handleChange}
            placeholder="Tuliskan inti pengaduan secara singkat"
            className={`w-full px-4 py-2.5 rounded-button border focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm ${errors.judul ? 'border-rose-500 bg-rose-50' : 'border-border-subtle bg-gray-50'}`}
            disabled={status === 'loading'}
          />
          {errors.judul && <span className="text-xs text-rose-500 font-medium">{errors.judul}</span>}
        </div>

        {/* Row 4: Isi */}
        <div className="flex flex-col gap-2">
          <label htmlFor="isi" className="text-sm font-bold text-brand-secondary">Isi Pengaduan <span className="text-rose-500">*</span></label>
          <textarea 
            id="isi" name="isi"
            value={formData.isi} onChange={handleChange}
            placeholder="Ceritakan kronologi atau detail keluhan Anda selengkap mungkin..."
            className={`w-full px-4 py-3 rounded-button border focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-sm resize-y min-h-[180px] ${errors.isi ? 'border-rose-500 bg-rose-50' : 'border-border-subtle bg-gray-50'}`}
            disabled={status === 'loading'}
          />
          {errors.isi && <span className="text-xs text-rose-500 font-medium">{errors.isi}</span>}
        </div>

        {/* Row 5: Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-secondary">Lampiran Bukti Pendukung (Opsional)</label>
          
          <div className="relative">
            <input 
              type="file" 
              id="lampiran" 
              name="lampiran" 
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={status === 'loading'}
            />
            
            {!formData.lampiran ? (
              <label 
                htmlFor="lampiran" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-card bg-gray-50 hover:bg-gray-100 hover:border-brand-primary cursor-pointer transition-colors"
              >
                <UploadCloud size={28} className="text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600">Klik untuk memilih file</span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG, atau PDF (Maks. 2MB)</span>
              </label>
            ) : (
              <div className="flex items-center justify-between p-4 border border-brand-primary bg-blue-50 rounded-card">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText size={24} className="text-brand-primary shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-bold text-brand-secondary truncate">{formData.lampiran.name}</p>
                    <p className="text-xs text-gray-500">{(formData.lampiran.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={removeFile}
                  className="p-1.5 hover:bg-rose-100 text-rose-500 rounded-full transition-colors focus:outline-none"
                  disabled={status === 'loading'}
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
          {errors.lampiran && <span className="text-xs text-rose-500 font-medium">{errors.lampiran}</span>}
        </div>

        {/* Row 6: Persetujuan */}
        <div className="mt-2 pt-6 border-t border-border-subtle">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
              <input 
                type="checkbox" 
                name="persetujuan"
                checked={formData.persetujuan}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-5 h-5 border-2 border-gray-300 rounded text-brand-primary focus:ring-brand-primary cursor-pointer peer"
              />
            </div>
            <span className={`text-sm select-none ${errors.persetujuan ? 'text-rose-600 font-medium' : 'text-gray-600 group-hover:text-gray-800'}`}>
              Saya menyatakan bahwa data dan laporan yang saya isi adalah benar dan dapat dipertanggungjawabkan.
            </span>
          </label>
          {errors.persetujuan && <span className="block text-xs text-rose-500 font-medium mt-2 ml-8">{errors.persetujuan}</span>}
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full md:w-auto px-10 flex items-center justify-center gap-2"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Mengirim...
              </>
            ) : (
              <>
                <Send size={18} /> Kirim Pengaduan
              </>
            )}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default ComplaintForm;
