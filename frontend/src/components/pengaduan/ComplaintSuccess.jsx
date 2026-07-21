import React from 'react';
import { CheckCircle2, Home, PlusCircle, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const ComplaintSuccess = ({ complaintNumber, onReset }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(complaintNumber);
    // Optional: could add a small toast here if we had a toast system
    alert("Nomor pengaduan disalin ke clipboard!");
  };

  return (
    <div className="bg-white rounded-card border border-border-subtle shadow-sm p-8 md:p-12 text-center flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-green-600" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary mb-4">
        Pengaduan Berhasil Dikirim
      </h2>
      
      <p className="text-gray-600 max-w-lg mb-8">
        Terima kasih telah menyampaikan pengaduan kepada Disdukcapil Kota Tegal.
        Pengaduan Anda akan diproses oleh petugas sesuai SOP yang berlaku.
      </p>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full max-w-md mb-8">
        <p className="text-sm text-gray-500 font-medium mb-2">Nomor Tiket Pengaduan Anda:</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xl md:text-2xl font-black text-brand-primary tracking-wide">
            {complaintNumber}
          </span>
          <button 
            onClick={handleCopy}
            className="text-gray-400 hover:text-brand-primary transition-colors focus:outline-none"
            title="Salin Nomor"
          >
            <Copy size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-100">
          *Simpan nomor pengaduan ini untuk keperluan pelacakan dan tindak lanjut.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link to="/" className="w-full">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Home size={18} /> Kembali ke Beranda
          </Button>
        </Link>
        <Button onClick={onReset} className="w-full flex items-center justify-center gap-2">
          <PlusCircle size={18} /> Kirim Pengaduan Baru
        </Button>
      </div>
    </div>
  );
};

export default ComplaintSuccess;
