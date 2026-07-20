import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import infoImage from '../../assets/jam_pelayanan.png';
import xLogo from '../../assets/icons/x.svg';
import instagramLogo from '../../assets/icons/instagram.svg';
import facebookLogo from '../../assets/icons/facebook.svg';
import whatsappLogo from '../../assets/icons/whatsapp.svg';

const GlobalSidebar = () => {
  // Data statis untuk Berita Pilihan
  const [popularNews] = useState([
    { id: 1, title: 'Permohonan Pembuatan KIA (Kartu Identitas Anak)', date: '28 Jan 2026' },
    { id: 2, title: 'KTP Elektronik Berlaku Seumur Hidup', date: '01 Sep 2025' },
    { id: 3, title: 'Cetak KTP Elektronik bagi Warga Pemegang Surat Keterangan', date: '26 Feb 2025' },
    { id: 4, title: 'Penyerahan KTP-el di SMK N 1 Kota Tegal', date: '14 Feb 2025' },
  ]);

  return (
    <aside className="flex flex-col gap-8 w-full">

      {/* Widget 1: Sapahumanis (Layanan Eksternal) */}
      <div className="card card-compact border-l-4 border-l-brand-accent-green bg-white shadow-sm flex flex-row items-center justify-between">
        <div>
          <span className="block text-[10px] font-bold text-gray-400 mb-0.5">INOVASI KAMI</span>
          <span className="text-base md:text-lg font-bold text-brand-accent-green uppercase tracking-wide">Sapahumanis</span>
        </div>
        <button className="btn btn-secondary text-sm px-4 py-2 bg-brand-accent-green text-white shadow-sm hover:shadow-md transition-shadow border-none">
          Masuk
        </button>
      </div>

      {/* Widget 2: Stay Connected (Jalan Pintas Sosial Media) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold uppercase text-brand-secondary tracking-wider bg-gray-900 text-white w-fit px-4 py-1 rounded-sm">
          Stay Connected
        </h3>
        <div className="flex flex-col gap-2">
          <a href="https://facebook.com/disdukcapiltegal" className="flex items-center justify-between bg-[#1877F2] text-white px-4 py-2.5 rounded-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
            <span className="flex items-center font-medium text-sm"><img src={facebookLogo} alt="Facebook" className="w-[16px] h-[16px] mr-3" /> Facebook</span>
            <span className="text-xs uppercase font-bold bg-white/20 px-2 py-0.5 rounded-sm">Like</span>
          </a>
          <a href="https://instagram.com/disdukkotategal" className="flex items-center justify-between bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white px-4 py-2.5 rounded-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
            <span className="flex items-center font-medium text-sm"><img src={instagramLogo} alt="Instagram" className="w-[16px] h-[16px] mr-3" /> Instagram</span>
            <span className="text-xs uppercase font-bold bg-white/20 px-2 py-0.5 rounded-sm">Follow</span>
          </a>
          <a href="https://x.com/disdukcapiltegal" className="flex items-center justify-between bg-black text-white px-4 py-2.5 rounded-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
            <span className="flex items-center font-medium text-sm"><img src={xLogo} alt="X" className="w-[16px] h-[16px] mr-3" /> X</span>
            <span className="text-xs uppercase font-bold bg-white/20 px-2 py-0.5 rounded-sm">Follow</span>
          </a>
          <a href="https://wa.me/62895800221212" className="flex items-center justify-between bg-[#25D366] text-white px-4 py-2.5 rounded-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
            <span className="flex items-center font-medium text-sm"><img src={whatsappLogo} alt="WhatsApp" className="w-[16px] h-[16px] mr-3" /> WhatsApp</span>
            <span className="text-xs uppercase font-bold bg-white/20 px-2 py-0.5 rounded-sm">Chat</span>
          </a>
        </div>
      </div>

      {/* Widget 3: Informasi Penting (Banner Placeholder Murni) */}
      <div className="flex flex-col">
        <h3 className="text-sm font-bold uppercase text-white tracking-wider bg-gray-900 w-fit px-4 py-1 rounded-sm mb-3">
          Informasi Penting
        </h3>
        <div className="w-full bg-gray-200 rounded-sm overflow-hidden border border-gray-300">
          {/* Ini murni placeholder gambar untuk banner pengumuman (seperti Jam Pelayanan) */}
          <img
            src={infoImage}
            alt="Banner Informasi Penting (Placeholder)"
            className="w-full aspect-[4/5] md:aspect-square object-cover"
          />
        </div>
      </div>

      {/* Widget 4: Berita Pilihan (List Rekomendasi Statis) */}
      <div className="card p-0 overflow-hidden">
        <div className="bg-gray-50 border-b border-border-subtle px-6 py-4">
          <h3 className="text-sm font-bold uppercase text-brand-secondary tracking-wider">Berita Pilihan</h3>
        </div>
        <div className="flex flex-col p-6 gap-3">
          {popularNews.map((news) => (
            <div key={news.id} className="flex flex-col border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <a href="#" className="group flex flex-col focus-visible:outline-none">
                <h4 className="text-sm font-medium text-text-main group-hover:text-brand-primary group-focus-visible:text-brand-primary transition-colors leading-snug mb-1">
                  {news.title}
                </h4>
                <span className="text-xs text-text-muted">{news.date}</span>
              </a>
            </div>
          ))}
          <button className="btn btn-outline text-sm w-full mt-2 group focus-visible:ring-brand-primary">
            Lihat Semua Pilihan <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </aside>
  );
};

export default GlobalSidebar;
