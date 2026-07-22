import { Globe, Hash, Camera, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  // Tanggal saat ini dalam bahasa Indonesia
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="hidden md:block bg-surface-light border-b border-border-subtle py-2">
      <div className="container-main flex items-center justify-between text-xs text-text-muted font-medium uppercase tracking-wider">
        {/* Kiri: Tanggal */}
        <div className="flex items-center space-x-2">
          <span>{today}</span>
        </div>
        
        {/* Kanan: Link Pendukung & Sosmed */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <Link to="/tentang-kami" className="hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary outline-none transition-colors">Tentang Kami</Link>
            <Link to="/alamat-kontak" className="hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary outline-none transition-colors">Hubungi Kami</Link>
          </div>
          <div className="flex items-center space-x-3 text-text-main">
            <a href="#" className="hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary outline-none rounded-sm transition-colors" aria-label="Facebook"><Globe size={14} /></a>
            <a href="#" className="hover:text-blue-400 focus-visible:ring-2 focus-visible:ring-brand-primary outline-none rounded-sm transition-colors" aria-label="Twitter"><Hash size={14} /></a>
            <a href="#" className="hover:text-pink-600 focus-visible:ring-2 focus-visible:ring-brand-primary outline-none rounded-sm transition-colors" aria-label="Instagram"><Camera size={14} /></a>
            <a href="#" className="hover:text-brand-accent-red focus-visible:ring-2 focus-visible:ring-brand-primary outline-none rounded-sm transition-colors" aria-label="Youtube"><Video size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
