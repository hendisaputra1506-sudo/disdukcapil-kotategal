import { Link } from 'react-router-dom';
import LogoImage from '../../assets/logo-header.png';

const Header = () => {
  return (
    <header className="bg-surface-light py-4 md:py-6">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Branding Area: Menggunakan Logo Resmi */}
        <Link to="/" className="flex items-center focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none rounded-sm -ml-2">
          {/* Logo dengan tinggi proporsional dan aspect ratio aslinya */}
          <img
            src={LogoImage}
            alt="Logo Disdukcapil Kota Tegal"
            className="h-32 w-auto object-contain rounded-md"
          />
        </Link>

      </div>
    </header>
  );
};

export default Header;
