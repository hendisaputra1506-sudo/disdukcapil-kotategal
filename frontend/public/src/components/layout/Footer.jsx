import { Link } from 'react-router-dom';
import LogoImage from '@assets/logo/Logo.png';
import instagramLogo from '@assets/icons/instagram.svg';
import whatsappLogo from '@assets/icons/whatsapp.svg';
import gmailLogo from '@assets/icons/gmail.svg';
import phoneLogo from '@assets/icons/phone.png';
import locationLogo from '@assets/icons/location.png';
import mailLogo from '@assets/icons/gmail.svg';
import { contactData } from '../../data/contact';

const Footer = () => {
  return (
    <footer className="bg-brand-secondary text-white pt-12 pb-6 border-t-4 border-brand-primary mt-auto">
      <div className="container-main">
        {/* Konten Utama Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Kolom 1: Branding */}
          <div className="flex flex-col space-y-4">
            <div>
              <img
                src={LogoImage}
                alt="Logo Disdukcapil Kota Tegal"
                className="h-16 w-auto object-contain opacity-90"
              />
            </div>
            <h3 className="flex items-center text-xl font-bold uppercase tracking-wider text-white"><span className="w-1.5 h-6 bg-blue-500 rounded-full mr-2"></span>Disdukcapil</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Melayani dengan cepat, tepat, dan transparan demi terwujudnya administrasi kependudukan yang tertib dan akurat di Kota Tegal.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="flex flex-col space-y-4">
            <h3 className="flex items-center text-lg font-bold uppercase tracking-wider text-white"><span className="w-1.5 h-5 bg-yellow-500 rounded-full mr-2"></span>Navigasi Cepat</h3>
            <ul className="flex flex-col space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Beranda</Link></li>
              <li><Link to="/profil" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Profil Instansi</Link></li>
              <li><Link to="/layanan-publik" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Layanan Publik</Link></li>
              <li><Link to="/informasi" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Berita & Pengumuman</Link></li>
              <li><Link to="/pengaduan" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Pengaduan Masyarakat</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div className="flex flex-col space-y-4">
            <h3 className="flex items-center text-lg font-bold uppercase tracking-wider text-white"><span className="w-1.5 h-5 bg-red-500 rounded-full mr-2"></span>Kontak Kami</h3>
            <ul className="flex flex-col space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <img src={locationLogo} alt="Location" className="w-[18px] h-[18px] mr-3 shrink-0 mt-0.5 opacity-70" aria-hidden="true" />
                <span>{contactData.address.street}<br />{contactData.address.area}<br />
                  {contactData.address.city} - {contactData.address.province}</span>
              </li>
              <li className="flex items-center">
                <img src={phoneLogo} alt="Phone" className="w-[18px] h-[18px] mr-3 shrink-0 opacity-70" aria-hidden="true" />
                <span>{contactData.contactLinks.phone.value}</span>
              </li>
              <li className="flex items-center">
                <img src={mailLogo} alt="Email" className="w-[18px] h-[18px] mr-3 shrink-0 opacity-70" aria-hidden="true" />
                <span>{contactData.contactLinks.email.value}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="flex items-center text-lg font-bold uppercase tracking-wider text-white"><span className="w-1.5 h-5 bg-green-500 rounded-full mr-2"></span>Hubungi Kami</h3>
            <div className="flex space-x-4 mt-2">
              <a href={contactData.contactLinks.whatsapp.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.whatsapp.platform} className="hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-full">
                <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8" />
              </a>
              <a href={contactData.contactLinks.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.instagram.platform} className="hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-full">
                <img src={instagramLogo} alt="Instagram" className="w-8 h-8" />
              </a>
              <a href={contactData.contactLinks.email.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.email.platform} className="hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-full">
                <img src={gmailLogo} alt="Email" className="w-8 h-8" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Disdukcapil Kota Tegal. Hak Cipta Dilindungi.</p>
          <p className="mt-2 md:mt-0">Dikelola oleh PIAK Disdukcapil.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
