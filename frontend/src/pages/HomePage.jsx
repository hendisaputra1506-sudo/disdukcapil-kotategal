import HeroBanner from '../components/home/HeroBanner';
import LatestNews from '../components/home/LatestNews';
import GlobalSidebar from '../components/layout/GlobalSidebar';

/**
 * HomePage.jsx
 * Menjahit keseluruhan komponen halaman utama (beranda).
 * Berpatokan pada struktur High-Fidelity Design.
 */
const HomePage = () => {
  return (
    <div className="w-full bg-surface-muted pb-16">
      <div className="container-main pt-8">
        
        {/* Section Atas: Hero Banner (100% lebar kontainer) */}
        <HeroBanner />

        {/* Section Utama: Kolom Ganda (Feed & Sidebar) */}
        <div className="flex flex-col lg:flex-row gap-8 mt-12 md:mt-16">
          
          {/* Kolom Kiri: Main Feed (Lebar 2/3 di Desktop) */}
          <div className="w-full lg:w-2/3">
            <LatestNews />
          </div>
          
          {/* Kolom Kanan: Sidebar Utility (Lebar 1/3 di Desktop) */}
          <div className="w-full lg:w-1/3 shrink-0">
            <GlobalSidebar />
          </div>

        </div>

      </div>
    </div>
  );
};

export default HomePage;
