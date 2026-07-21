import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import SectionTitle from '../components/ui/SectionTitle';
import { profileData } from '../data/profile';

const Profil = () => {
  const { slug } = useParams();
  
  // Jika tidak ada slug, redirect ke default tab
  if (!slug) {
    return <Navigate to="/profil/visi-misi" replace />;
  }

  const currentSlug = slug;

  const submenus = [
    { label: 'Visi & Misi', path: '/profil/visi-misi', id: 'visi-misi' },
    { label: 'Struktur Organisasi', path: '/profil/struktur-organisasi', id: 'struktur-organisasi' },
    { label: 'Moto Pelayanan', path: '/profil/moto-pelayanan', id: 'moto-pelayanan' },
    { label: 'Sarana & Prasarana', path: '/profil/sarana-prasarana', id: 'sarana-prasarana' },
    { label: 'Maklumat Pelayanan', path: '/profil/maklumat-pelayanan', id: 'maklumat-pelayanan' }
  ];

  const currentMenu = submenus.find(m => m.id === currentSlug) || submenus[0];

  const renderContent = () => {
    switch(currentSlug) {
      case 'visi-misi':
        return (
          <>
            <h3 className="text-xl font-bold mb-4 text-brand-secondary">Visi</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">{profileData.visiMisi.visi}</p>
            <h3 className="text-xl font-bold mb-4 text-brand-secondary">Misi</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {profileData.visiMisi.misi.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </>
        );
      case 'moto-pelayanan':
        return (
          <div className="bg-brand-secondary/5 p-8 rounded-card border border-brand-primary/20 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-brand-primary italic leading-relaxed">"{profileData.moto}"</h3>
          </div>
        );
      case 'maklumat-pelayanan':
        return (
          <div className="bg-white p-8 rounded-card border-l-4 border-brand-accent-yellow shadow-sm border-t border-r border-b border-border-subtle">
            <p className="text-lg text-gray-800 leading-relaxed font-medium">"{profileData.maklumat}"</p>
          </div>
        );
      default:
        return (
          <div className="aspect-video bg-gray-50 flex items-center justify-center rounded-card text-gray-500 border border-dashed border-gray-300">
            <p className="font-medium">Konten {currentMenu.label} sedang dalam tahap penyempurnaan.</p>
          </div>
        );
    }
  };

  return (
    <PageLayout 
      title="Profil Instansi" 
      breadcrumbItems={[
        { label: 'Profil', path: '/profil' },
        { label: currentMenu.label, path: currentMenu.path }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Subnavigation */}
        <div className="w-full lg:w-1/4 shrink-0">
          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-2 border-b border-border-subtle" style={{ scrollbarWidth: 'none' }}>
            {submenus.map(menu => (
              <Link 
                key={menu.id} 
                to={menu.path}
                className={`whitespace-nowrap px-4 py-2.5 rounded-button text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${currentSlug === menu.id ? 'bg-brand-primary text-white shadow-md' : 'bg-white border border-border-subtle text-gray-600 hover:bg-gray-50 hover:text-brand-secondary'}`}
              >
                {menu.label}
              </Link>
            ))}
          </div>
          
          {/* Desktop Vertical Sidebar */}
          <div className="hidden lg:flex flex-col gap-1 border border-border-subtle rounded-card p-2 bg-white shadow-sm sticky top-24">
            {submenus.map(menu => (
              <Link 
                key={menu.id} 
                to={menu.path}
                className={`px-4 py-3 rounded text-sm font-bold transition-all border-l-[3px] focus-visible:outline-none focus-visible:bg-gray-50 ${currentSlug === menu.id ? 'border-brand-primary bg-brand-secondary/5 text-brand-primary' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-brand-secondary'}`}
              >
                {menu.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white p-6 md:p-8 rounded-card shadow-sm border border-border-subtle">
            <SectionTitle title={currentMenu.label} className="!mb-6" />
            <div className="prose prose-blue max-w-none text-gray-700">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profil;
