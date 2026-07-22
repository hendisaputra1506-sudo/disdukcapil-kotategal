import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Daftar menu navigasi utama dengan dukungan dropdown bersarang (Nested)
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { 
      name: 'Profil', 
      path: '/profil', // Path basis fallback, tapi dropdown lebih utama
      dropdown: [
        { name: 'Visi & Misi', path: '/profil/visi-misi' },
        { name: 'Struktur Organisasi', path: '/profil/struktur-organisasi' },
        { name: 'Moto Pelayanan', path: '/profil/moto-pelayanan' },
        { name: 'Sarana & Prasarana', path: '/profil/sarana-prasarana' },
        { name: 'Maklumat Pelayanan', path: '/profil/maklumat-pelayanan' },
      ]
    },
    { name: 'Layanan', path: '/layanan-publik' },
    { name: 'Berita', path: '/informasi' },
    { name: 'Pengaduan', path: '/pengaduan' },
    { name: 'Kontak', path: '/alamat-kontak' },
  ];

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tutup mobile menu saat rute berubah
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <nav className="bg-brand-secondary sticky top-0 z-50 shadow-md">
      <div className="container-main">
        <div className="flex justify-between items-center h-14 relative" ref={dropdownRef}>
          
          {/* Label Mobile Saat Scroll */}
          <div className="md:hidden text-white font-bold text-lg uppercase tracking-wide">
            Disdukcapil
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center h-full">
            {navLinks.map((link, index) => {
              const hasDropdown = !!link.dropdown;
              // Pengecekan aktif untuk menu parent yang memiliki anak rute
              const isParentActive = location.pathname.startsWith(link.path) && link.path !== '/';
              const isHomeActive = link.path === '/' && location.pathname === '/';
              const isActive = hasDropdown ? isParentActive : (link.path === '/' ? isHomeActive : location.pathname === link.path);

              return (
                <div 
                  key={link.name}
                  className="relative h-full"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(index)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <NavLink
                    to={hasDropdown ? link.dropdown[0].path : link.path}
                    className={`flex items-center px-4 h-full text-sm font-bold uppercase transition-colors focus-visible:outline-none focus-visible:bg-gray-800 ${
                      isActive 
                        ? 'bg-brand-primary text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {hasDropdown && <ChevronDown size={14} className="ml-1 shrink-0" />}
                  </NavLink>

                  {/* Dropdown Menu Desktop */}
                  {hasDropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 min-w-[220px] bg-white shadow-lg border-t-2 border-brand-primary py-2 z-50 rounded-b-sm">
                      {link.dropdown.map((dropItem) => (
                        <NavLink
                          key={dropItem.name}
                          to={dropItem.path}
                          className={({ isActive: dropActive }) => 
                            `block px-4 py-2.5 text-sm font-medium transition-colors ${
                              dropActive 
                                ? 'bg-gray-50 text-brand-primary font-bold border-l-2 border-brand-primary' 
                                : 'text-gray-700 hover:bg-gray-50 hover:text-brand-primary border-l-2 border-transparent'
                            }`
                          }
                        >
                          {dropItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Search Icon (Desktop) */}
          <div className="hidden md:flex items-center">
            <button aria-label="Pencarian" className="p-2 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm cursor-pointer transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle navigasi" 
              className="p-2 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Accordion-style) */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 absolute w-full shadow-lg max-h-[calc(100vh-56px)] overflow-y-auto">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link, index) => {
              const hasDropdown = !!link.dropdown;
              const isParentActive = location.pathname.startsWith(link.path) && link.path !== '/';
              const isHomeActive = link.path === '/' && location.pathname === '/';
              const isActive = hasDropdown ? isParentActive : (link.path === '/' ? isHomeActive : location.pathname === link.path);

              return (
                <div key={link.name}>
                  {hasDropdown ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-sm text-base font-bold uppercase ${
                          isActive 
                            ? 'bg-brand-primary text-white' 
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={18} className={`transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Sub-menu Mobile */}
                      {activeDropdown === index && (
                        <div className="pl-4 pr-2 py-2 space-y-1 bg-gray-800/50 rounded-b-sm mb-2">
                          {link.dropdown.map((dropItem) => (
                            <NavLink
                              key={dropItem.name}
                              to={dropItem.path}
                              onClick={() => setIsOpen(false)}
                              className={({ isActive: dropActive }) => 
                                `block px-3 py-2.5 rounded-sm text-sm font-medium ${
                                  dropActive 
                                    ? 'bg-gray-800 text-brand-primary font-bold' 
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`
                              }
                            >
                              {dropItem.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3 rounded-sm text-base font-bold uppercase ${
                        isActive 
                          ? 'bg-brand-primary text-white' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </NavLink>
                  )}
                </div>
              );
            })}
            
            {/* Pencarian Mobile */}
            <div className="px-3 pt-4 pb-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Cari..." 
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-button py-2 px-3 pl-10 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
