import PageLayout from '../../layout/PageLayout';
import SarprasPlaceholder from '@assets/placeholder/sarpras.svg';
import HeroProfilImage from '@assets/placeholder/hero-profil.svg';

const SaranaPrasarana = () => {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '#' },
    { label: 'Sarana & Prasarana' }
  ];

  // Simulasi data statis galeri sarpras
  const galleries = [
    { id: 1, title: 'Ruang Tunggu Pelayanan' },
    { id: 2, title: 'Loket Pendaftaran' },
    { id: 3, title: 'Ruang Perekaman KTP-el' },
    { id: 4, title: 'Fasilitas Ramah Anak' },
    { id: 5, title: 'Jalur Disabilitas' },
    { id: 6, title: 'Pusat Informasi' },
  ];

  return (
    <PageLayout bannerTitle="PROFIL" breadcrumbs={breadcrumbs} heroImage={HeroProfilImage}>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Sarana & Prasarana</h2>
        <div className="w-16 h-1 bg-brand-primary rounded-full mb-4"></div>
        <p className="text-sm text-gray-500 max-w-2xl">
          Berbagai fasilitas fisik dan penunjang pelayanan masyarakat yang disediakan oleh Dinas Kependudukan dan Pencatatan Sipil Kota Tegal guna mewujudkan lingkungan pelayanan yang inklusif, nyaman, dan terintegrasi bagi seluruh warga.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {galleries.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 group">
            <div className="overflow-hidden rounded-sm border border-gray-200 bg-gray-50 p-1">
              <img 
                src={SarprasPlaceholder} 
                alt={item.title} 
                className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.02] rounded-sm"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-semibold text-gray-700 text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default SaranaPrasarana;
