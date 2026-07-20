import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const menuItems = [
    { name: 'Beranda', path: '/' },
    { 
      name: 'Profil', 
      path: '/profil',
      dropdown: [
        { name: 'Visi & Misi', path: '/profil/visi-misi' },
        { name: 'Struktur Organisasi', path: '/profil/struktur-organisasi' },
        { name: 'Moto Pelayanan', path: '/profil/moto-pelayanan' },
        { name: 'Sarana & Prasarana', path: '/profil/sarana-prasarana' },
        { name: 'Maklumat Pelayanan', path: '/profil/maklumat-pelayanan' },
      ]
    },
    { 
      name: 'Layanan', 
      path: '/layanan',
      dropdown: [
        { name: 'Jam Pelayanan', path: '/layanan/jam-pelayanan' },
        { name: 'Persyaratan KTP', path: '/layanan/persyaratan-ktp' },
        { name: 'Persyaratan KK', path: '/layanan/persyaratan-kk' },
        { name: 'Persyaratan Akta Kelahiran', path: '/layanan/persyaratan-akta-kelahiran' },
        { name: 'Persyaratan Akta Kematian', path: '/layanan/persyaratan-akta-kematian' },
        { name: 'Persyaratan KIA', path: '/layanan/persyaratan-kia' },
        { name: 'Alur Pelayanan', path: '/layanan/alur-pelayanan' },
      ]
    },
    { 
      name: 'Galeri & Berita', 
      path: '/berita',
    },
    { name: 'Pengaduan', path: '/pengaduan' },
    { name: 'Kontak', path: '/kontak' },
    { name: 'Tentang Website', path: '/tentang-website' },
  ];

  return (
    <nav className="bg-brand-secondary text-white relative z-50 shadow-md">
      <div className="container-main" ref={dropdownRef}>
        <div className="flex justify-between items-center h-14">
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center h-full">
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <div 
                  key={index} 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  <Link 
                    to={item.path}
                    className={`px-4 xl:px-6 py-4 h-full text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary
                      ${active 
                        ? 'border-b-[3px] border-brand-primary text-white bg-white/5' 
                        : 'hover:bg-white/10 hover:text-white border-b-[3px] border-transparent'
                      }`}
                    aria-haspopup={item.dropdown ? "true" : "false"}
                    aria-expanded={activeDropdown === item.name}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown size={16} className={`mt-0.5 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Dropdown Menu Desktop */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl border-t-4 border-brand-primary py-2 rounded-b-md">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-6 py-3 text-sm font-medium text-text-main hover:bg-gray-50 hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:bg-gray-50"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center h-full ml-auto">
            <button 
              className="px-4 py-4 hover:bg-brand-primary transition-colors h-full flex items-center focus-visible:outline-none"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[800px] border-t border-white/10 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-brand-secondary">
          <div className="container-main py-2 flex flex-col">
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <div key={index} className="flex flex-col">
                  <div className={`flex justify-between items-center border-b border-white/5 ${active ? 'bg-white/5' : ''}`}>
                    <Link 
                      to={item.path}
                      className={`flex-1 py-3.5 px-3 text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-none ${active ? 'text-brand-primary' : 'text-white hover:text-brand-primary'}`}
                      onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <button 
                        className="p-3 focus-visible:outline-none hover:text-brand-primary transition-colors"
                        onClick={() => handleDropdown(item.name)}
                        aria-expanded={activeDropdown === item.name}
                      >
                        <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180 text-brand-primary' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.name ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-black/20 pl-6 py-2 flex flex-col mb-1">
                      {item.dropdown?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="py-3 px-3 text-sm font-medium text-gray-300 hover:text-white transition-colors border-b border-white/5 last:border-b-0 focus-visible:outline-none"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
