import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { contactData } from '../../data/contact';
import whatsappLogo from '@assets/icons/whatsapp.svg';
import instagramLogo from '@assets/icons/instagram.svg';
import gmailLogo from '@assets/icons/gmail.svg';

const TopHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigasi ke halaman pencarian (atau biarkan statis jika belum diimplementasi)
      console.log('Searching for:', searchQuery);
    }
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="hidden md:block bg-gradient-to-r from-slate-900 to-brand-primary text-gray-300 border-b-[3px] border-brand-primary">
      <div className="container-main min-h-[40px] py-1 flex flex-wrap justify-between items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
        {/* Left: Date */}
        <div className="flex items-center text-gray-400">
          {currentDate}
        </div>

        {/* Right: Links, Social & Search */}
        <div className="flex flex-wrap items-center">
          <div className="flex items-center gap-3 lg:gap-5 pr-3 lg:pr-5 border-r border-gray-700">
            <Link to="/profil" className="hover:text-white focus-visible:text-white transition-colors h-full flex items-center">Tentang Kami</Link>
            <Link to="/kontak" className="hover:text-white focus-visible:text-white transition-colors h-full flex items-center">Hubungi Kami</Link>
            <Link to="/tentang-website" className="hover:text-white focus-visible:text-white transition-colors h-full flex items-center">Tentang Website</Link>
          </div>
          
          {/* Stay Connected (Quick Contact) */}
          <div className="flex items-center gap-3 lg:gap-4 px-3 lg:px-5 border-l border-gray-700">
            <div className="flex items-center gap-3">
              <a href={contactData.contactLinks.whatsapp.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.whatsapp.platform} className="hover:scale-110 transition-transform flex items-center outline-none">
                <img src={whatsappLogo} alt="WhatsApp" className="w-[14px] h-[14px]" />
              </a>
              <a href={contactData.contactLinks.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.instagram.platform} className="hover:scale-110 transition-transform flex items-center outline-none">
                <img src={instagramLogo} alt="Instagram" className="w-[14px] h-[14px]" />
              </a>
              <a href={contactData.contactLinks.email.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.email.platform} className="hover:scale-110 transition-transform flex items-center outline-none">
                <img src={gmailLogo} alt="Email" className="w-[14px] h-[14px]" />
              </a>
            </div>
          </div>

          {/* Search Button */}
          <div className="pl-3 lg:pl-5 flex items-center border-l border-gray-700">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center group">
              <input 
                type="text" 
                placeholder="Cari..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-l-md w-0 opacity-0 group-hover:w-32 group-hover:opacity-100 transition-all duration-300 focus:w-32 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              <button type="submit" className="text-gray-400 hover:text-white p-1" aria-label="Search">
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
