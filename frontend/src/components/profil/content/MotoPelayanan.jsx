import PageLayout from '../../layout/PageLayout';
import HeroProfilImage from '../../../assets/placeholder/hero-profil.svg';

const MotoPelayanan = () => {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '#' },
    { label: 'Moto Pelayanan' }
  ];

  return (
    <PageLayout bannerTitle="PROFIL" breadcrumbs={breadcrumbs} heroImage={HeroProfilImage}>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Moto Pelayanan</h2>
        <div className="w-16 h-1 bg-brand-primary rounded-full mb-4"></div>
        <p className="text-sm text-gray-500 max-w-2xl">
          Komitmen moral dan panduan sikap bagi seluruh aparatur negara dalam melayani setiap kebutuhan administrasi kependudukan masyarakat dengan sepenuh hati.
        </p>
      </div>
      
      <div className="bg-brand-secondary text-white p-8 md:p-12 rounded-md shadow-sm border-l-8 border-brand-primary flex flex-col items-start justify-center">
        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4">
          Cepat, Tepat, dan Membahagiakan
        </h3>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
          Kami berkomitmen untuk memberikan pelayanan publik di bidang administrasi kependudukan yang bebas dari praktik korupsi, kolusi, dan nepotisme. Memastikan seluruh lapisan masyarakat Kota Tegal mendapatkan dokumen kependudukannya dengan mudah tanpa hambatan birokrasi yang berbelit, sehingga setiap pelayanan bermuara pada kebahagiaan warga.
        </p>
      </div>
    </PageLayout>
  );
};

export default MotoPelayanan;
