import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import HeaderBg from '../../assets/header_bg.png';

const MainHeader = () => {
  return (
    <header 
      className="py-5 md:py-7 border-b border-gray-200 bg-no-repeat bg-right bg-white"
      style={{ backgroundImage: `url(${HeaderBg})`, backgroundSize: 'auto 100%' }}
    >
      <div className="container-main flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo Section */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center gap-4 md:gap-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm p-1">
            <img src={Logo} alt="Logo Disdukcapil Kota Tegal" className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform group-hover:scale-105 duration-300" />
            <div className="text-center md:text-left flex flex-col justify-center">
              <h1 className="text-base md:text-xl lg:text-2xl font-extrabold text-brand-secondary leading-[1.15] uppercase tracking-tight">
                Dinas Kependudukan dan <br className="hidden sm:block" /> Pencatatan Sipil
              </h1>
              <p className="text-xs md:text-sm lg:text-base font-bold text-brand-primary uppercase tracking-widest mt-1.5">
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
