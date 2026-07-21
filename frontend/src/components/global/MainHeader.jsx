import { Link } from 'react-router-dom';
import Logo from '@assets/Logo.png';
import HeaderBg from '@assets/header_bg.png';

const MainHeader = () => {
  return (
    <header className="py-4 md:py-6 border-b border-gray-200 bg-white relative z-10 shadow-sm overflow-hidden">
      
      {/* Background Banner - Disembunyikan di layar kecil agar tidak menabrak logo/teks */}
      <div 
        className="hidden lg:block absolute inset-0 bg-no-repeat bg-right pointer-events-none"
        style={{ backgroundImage: `url(${HeaderBg})`, backgroundSize: 'auto 100%' }}
      />

      <div className="container-main relative z-10 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center gap-3 md:gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm p-1">
            <img src={Logo} alt="Logo Disdukcapil Kota Tegal" className="h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105 duration-300" />
            <div className="text-left flex flex-col justify-center">
              <h1 className="text-sm md:text-base lg:text-xl font-extrabold text-brand-secondary leading-[1.15] uppercase tracking-tight">
                Dinas Kependudukan dan <br className="hidden sm:block" /> Pencatatan Sipil
              </h1>
              <p className="text-[10px] md:text-xs lg:text-sm font-bold text-brand-primary uppercase tracking-widest mt-0.5 md:mt-1">
                Kota Tegal
              </p>
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default MainHeader;
