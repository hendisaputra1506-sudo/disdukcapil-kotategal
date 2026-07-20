import PageLayout from '../../layout/PageLayout';
import HeroProfilImage from '../../../assets/placeholder/hero-profil.svg';

const VisiMisi = () => {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '#' },
    { label: 'Visi & Misi' }
  ];

  return (
    <PageLayout bannerTitle="PROFIL" breadcrumbs={breadcrumbs} heroImage={HeroProfilImage}>
      <div className="flex flex-col gap-10">
        <section>
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Visi</h2>
            <div className="w-16 h-1 bg-brand-primary rounded-full mb-4"></div>
            <p className="text-sm text-gray-500">
              Pandangan jauh ke depan mengenai cita-cita dan tujuan ideal yang ingin dicapai oleh Dinas Kependudukan dan Pencatatan Sipil Kota Tegal.
            </p>
          </div>
          
          <p className="text-base md:text-lg text-gray-800 leading-relaxed text-justify bg-gray-50 p-6 rounded-md border border-gray-100 font-medium">
            &quot;Terwujudnya Pelayanan Administrasi Kependudukan dan Pencatatan Sipil yang Tertib, Akurat, dan Membahagiakan Masyarakat Kota Tegal&quot;
          </p>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Misi</h2>
            <div className="w-16 h-1 bg-brand-primary rounded-full mb-4"></div>
            <p className="text-sm text-gray-500">
              Langkah-langkah strategis dan konkret yang dilaksanakan untuk mewujudkan Visi instansi.
            </p>
          </div>
          
          <ol className="list-decimal list-outside ml-5 space-y-4 text-base md:text-lg text-gray-800 leading-relaxed">
            <li>Meningkatkan kualitas pelayanan administrasi kependudukan yang prima dan terintegrasi.</li>
            <li>Meningkatkan kesadaran masyarakat akan pentingnya kepemilikan dokumen kependudukan.</li>
            <li>Mengembangkan sistem informasi administrasi kependudukan (SIAK) yang andal dan aman.</li>
            <li>Meningkatkan profesionalisme aparatur penyelenggara pelayanan administrasi kependudukan.</li>
          </ol>
        </section>
      </div>
    </PageLayout>
  );
};

export default VisiMisi;
