import PropTypes from 'prop-types';
import LogoImage from '@assets/logo-header.png';

const PageBanner = ({ title }) => {
  return (
    <div className="w-full bg-brand-primary py-8 md:py-12 shadow-inner flex items-center relative overflow-hidden">
      <div className="container-main w-full flex items-center justify-between z-10 relative">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wider mb-1">
            {title}
          </h1>
          <p className="text-sm md:text-base text-blue-100 font-medium">
            Dinas Kependudukan dan Pencatatan Sipil<br className="block md:hidden"/> Kota Tegal
          </p>
        </div>
        
        {/* Dekorasi Logo Transparan di Kanan */}
        <div className="hidden md:block opacity-20">
          <img src={LogoImage} alt="Decor Logo" className="h-24 w-auto object-contain" />
        </div>
      </div>
    </div>
  );
};

PageBanner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageBanner;
