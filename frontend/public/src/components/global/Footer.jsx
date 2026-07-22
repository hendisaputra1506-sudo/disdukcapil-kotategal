import { Link } from 'react-router-dom';
import LogoImage from '@assets/logo/Logo.png';
import whatsappLogo from '@assets/icons/whatsapp.svg';
import instagramLogo from '@assets/icons/instagram.svg';
import gmailLogo from '@assets/icons/gmail.svg';
import facebookLogo from '@assets/icons/facebook.svg';
import tiktokLogo from '@assets/icons/tiktok.svg';
import xLogo from '@assets/icons/x.svg';
import locationLogo from '@assets/icons/location.png';
import phoneLogo from '@assets/icons/phone.png';
import mailLogo from '@assets/icons/gmail.svg';
import { contactData } from '../../data/contact';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-brand-primary to-blue-600 text-blue-50 pt-10 pb-6 border-t-[3px] border-brand-primary mt-auto">
      <div className="container-main">
        {/* Konten Utama Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          {/* Kolom 1: Branding */}
          <div className="flex flex-col space-y-4">
            <div>
              <img
                src={LogoImage}
                alt="Logo Disdukcapil Kota Tegal"
                className="h-16 w-auto object-contain opacity-90"
              />
            </div>
            <h3 className="flex items-center text-lg font-bold uppercase tracking-widest text-white"><span className="w-1.5 h-5 bg-blue-500 rounded-full mr-2"></span>Disdukcapil</h3>
            <p className="text-sm leading-relaxed text-blue-100">
              Melayani dengan cepat, tepat, dan transparan demi terwujudnya administrasi kependudukan yang tertib dan akurat di Kota Tegal.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="flex flex-col space-y-4">
            <h3 className="flex items-center text-sm font-bold uppercase tracking-widest text-white"><span className="w-1.5 h-4 bg-yellow-500 rounded-full mr-2"></span>Navigasi Cepat</h3>
            <ul className="flex flex-col space-y-2.5 text-sm text-blue-100">
              <li><Link to="/" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Beranda</Link></li>
              <li><Link to="/profil" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Profil</Link></li>
              <li><Link to="/layanan" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Layanan</Link></li>
              <li><Link to="/berita" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Galeri & Berita</Link></li>
              <li><Link to="/pengaduan" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Pengaduan</Link></li>
              <li><Link to="/kontak" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Kontak</Link></li>
              <li><Link to="/tentang-website" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">Tentang Website</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div className="flex flex-col space-y-4">
            <h3 className="flex items-center text-sm font-bold uppercase tracking-widest text-white"><span className="w-1.5 h-4 bg-red-500 rounded-full mr-2"></span>Kontak Kami</h3>
            <ul className="flex flex-col space-y-3.5 text-sm text-blue-100">
              <li className="flex items-start">
                <img src={locationLogo} alt="Location" className="w-[16px] h-[16px] mr-3 opacity-70 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">
                  {contactData.address.street}<br />
                  {contactData.address.area}<br />
                  {contactData.address.city} - {contactData.address.province} {contactData.address.postalCode}
                </span>
              </li>
              <li className="flex items-center">
                <img src={phoneLogo} alt="Phone" className="w-[16px] h-[16px] mr-3 opacity-70 shrink-0" aria-hidden="true" />
                <span>{contactData.contactLinks.phone.value}</span>
              </li>
              <li className="flex items-center">
                <img src={mailLogo} alt="Email" className="w-[16px] h-[16px] mr-3 opacity-70 shrink-0" aria-hidden="true" />
                <span>{contactData.contactLinks.email.value}</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sosial Media (Hanya Mobile) */}
          <div className="flex lg:hidden flex-col space-y-4">
            <h3 className="flex items-center text-sm font-bold uppercase tracking-widest text-white"><span className="w-1.5 h-4 bg-green-500 rounded-full mr-2"></span>Ikuti Kami</h3>
            <div className="flex flex-wrap gap-2.5">
              <a href={contactData.contactLinks.whatsapp.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.whatsapp.platform} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={whatsappLogo} alt="WhatsApp" className="w-[18px] h-[18px]" />
              </a>
              <a href={contactData.contactLinks.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.instagram.platform} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={instagramLogo} alt="Instagram" className="w-[18px] h-[18px]" />
              </a>
              <a href={contactData.contactLinks.facebook.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.facebook.platform} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={facebookLogo} alt="Facebook" className="w-[18px] h-[18px]" />
              </a>
              <a href={contactData.contactLinks.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.tiktok.platform} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={tiktokLogo} alt="TikTok" className="w-[18px] h-[18px]" />
              </a>
              <a href={contactData.contactLinks.x.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.x.platform} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={xLogo} alt="X" className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-xs text-blue-200">
          <p>&copy; {new Date().getFullYear()} Dinas Kependudukan dan Pencatatan Sipil Kota Tegal.</p>
          <p className="mt-2 md:mt-0 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline">Dikelola oleh PIAK Disdukcapil.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
