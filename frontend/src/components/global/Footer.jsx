import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import LogoImage from '../../assets/Logo.png';
import whatsappLogo from '../../assets/icons/whatsapp.svg';
import instagramLogo from '../../assets/icons/instagram.svg';
import gmailLogo from '../../assets/icons/gmail.svg';
import { contactData } from '../../data/contact';

const Footer = () => {
  return (
    <footer className="bg-brand-secondary text-gray-300 pt-12 pb-6 border-t-[3px] border-brand-primary mt-auto">
      <div className="container-main">
        {/* Konten Utama Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Kolom 1: Branding */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-widest text-white">Disdukcapil</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Melayani dengan cepat, tepat, dan transparan demi terwujudnya administrasi kependudukan yang tertib dan akurat di Kota Tegal.
            </p>
            <div className="mt-2">
              <img
                src={LogoImage}
                alt="Logo Disdukcapil Kota Tegal"
                className="h-16 w-auto object-contain opacity-90"
              />
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Navigasi Cepat</h3>
            <ul className="flex flex-col space-y-2.5 text-sm text-gray-400">
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Kontak Kami</h3>
            <ul className="flex flex-col space-y-3.5 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 text-gray-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">
                  {contactData.address.street}<br />
                  {contactData.address.area}<br />
                  {contactData.address.city} - {contactData.address.province} {contactData.address.postalCode}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 text-gray-500 shrink-0" aria-hidden="true" />
                <span>{contactData.contactLinks.phone.value}</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-gray-500 shrink-0" aria-hidden="true" />
                <span>{contactData.contactLinks.email.value}</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sosial Media */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Ikuti Kami</h3>
            <div className="flex space-x-2.5">
              <a href={contactData.contactLinks.whatsapp.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.whatsapp.platform} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={whatsappLogo} alt="WhatsApp" className="w-[18px] h-[18px]" />
              </a>
              <a href={contactData.contactLinks.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.instagram.platform} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={instagramLogo} alt="Instagram" className="w-[18px] h-[18px]" />
              </a>
              <a href={contactData.contactLinks.email.url} target="_blank" rel="noopener noreferrer" aria-label={contactData.contactLinks.email.platform} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-rose-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <img src={gmailLogo} alt="Email" className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dinas Kependudukan dan Pencatatan Sipil Kota Tegal.</p>
          <p className="mt-2 md:mt-0 hover:text-gray-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline">Dikelola oleh PIAK Disdukcapil.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
