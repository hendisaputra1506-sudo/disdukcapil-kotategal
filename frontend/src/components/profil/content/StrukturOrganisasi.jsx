import PageLayout from '../../layout/PageLayout';
import OrgChartPlaceholder from '../../../assets/placeholder/org-chart.svg';
import HeroProfilImage from '../../../assets/placeholder/hero-profil.svg';

const StrukturOrganisasi = () => {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '#' },
    { label: 'Struktur Organisasi' }
  ];

  return (
    <PageLayout bannerTitle="PROFIL" breadcrumbs={breadcrumbs} heroImage={HeroProfilImage}>
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Struktur Organisasi</h2>
        <div className="w-16 h-1 bg-brand-primary rounded-full mb-4"></div>
        <p className="text-sm text-gray-500 max-w-2xl">
          Susunan hierarki jabatan dan tata kerja di lingkungan Dinas Kependudukan dan Pencatatan Sipil Kota Tegal yang disusun secara sistematis guna memastikan pembagian tugas dan wewenang yang jelas dalam penyelenggaraan pelayanan publik.
        </p>
      </div>
      
      <div className="card border border-gray-200 overflow-x-auto p-4 md:p-6 bg-gray-50 rounded-md">
        <img 
          src={OrgChartPlaceholder} 
          alt="Bagan Struktur Organisasi Dinas Kependudukan dan Pencatatan Sipil" 
          className="w-[1000px] max-w-none md:w-full md:max-w-full h-auto mx-auto object-contain rounded-sm"
          loading="lazy"
        />
        <p className="text-xs text-center text-gray-500 mt-6 italic">
          Bagan di atas menampilkan alur koordinasi mulai dari Kepala Dinas hingga bidang pelayanan operasional.<br/>
          (Gunakan gestur geser atau scroll horizontal pada layar kecil untuk melihat keseluruhan bagan).
        </p>
      </div>
    </PageLayout>
  );
};

export default StrukturOrganisasi;
