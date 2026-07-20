import PageLayout from '../../layout/PageLayout';
import MaklumatPlaceholder from '../../../assets/placeholder/maklumat.svg';
import HeroProfilImage from '../../../assets/placeholder/hero-profil.svg';

const MaklumatPelayanan = () => {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '#' },
    { label: 'Maklumat Pelayanan' }
  ];

  return (
    <PageLayout bannerTitle="PROFIL" breadcrumbs={breadcrumbs} heroImage={HeroProfilImage}>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Maklumat Pelayanan</h2>
        <div className="w-16 h-1 bg-brand-primary rounded-full mb-4"></div>
        <p className="text-sm text-gray-500 max-w-2xl">
          Dokumen resmi sebagai bentuk pernyataan komitmen dan janji dari Dinas Kependudukan dan Pencatatan Sipil Kota Tegal untuk menyelenggarakan pelayanan publik yang sesuai dengan standar pelayanan yang telah ditetapkan.
        </p>
      </div>
      
      <div className="border border-gray-200 bg-gray-50 p-4 rounded-md shadow-sm max-w-2xl">
        <h3 className="sr-only">Preview Dokumen Maklumat</h3>
        <img 
          src={MaklumatPlaceholder} 
          alt="Pratinjau Dokumen Maklumat Pelayanan Disdukcapil Kota Tegal" 
          className="w-full h-auto object-contain rounded-sm border border-gray-300"
          loading="lazy"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-500 font-medium">Diperbarui: Januari 2026</span>
          <button className="text-sm text-brand-primary font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary px-2 py-1 rounded-sm">
            Unduh Dokumen (PDF)
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default MaklumatPelayanan;
