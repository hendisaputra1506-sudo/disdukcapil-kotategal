import React, { useState } from 'react';
import { 
  ChevronDown, Navigation, CheckCircle, MapPin, Clock
} from 'lucide-react';
import whatsappLogo from '../assets/icons/whatsapp.svg';
import instagramLogo from '../assets/icons/instagram.svg';
import gmailLogo from '../assets/icons/gmail.svg';
import phoneLogo from '../assets/icons/phone.svg';
import PageLayout from '../layouts/PageLayout';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import IconBox from '../components/ui/IconBox';
import { contactData } from '../data/contact';

const Kontak = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <PageLayout 
      title="Hubungi Kami" 
      breadcrumbItems={[{ label: 'Kontak', path: '/kontak' }]}
    >
      <div className="flex flex-col gap-10 md:gap-14 pb-8">
        
        {/* 1. Hero Contact Section */}
        <section className="text-center max-w-4xl mx-auto pt-4 md:pt-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-secondary mb-6">
            HUBUNGI KAMI
          </h1>
          <p className="text-gray-600 text-lg mb-4 md:mb-10 leading-relaxed">
            Kami siap membantu masyarakat dalam memperoleh informasi dan pelayanan administrasi kependudukan. Silakan hubungi kami melalui saluran resmi berikut.
          </p>
        </section>

        {/* 2 & 3. Split Desktop 40:60 (Informasi Kontak & Peta) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: 40% (Informasi Kontak & Jam Pelayanan & Pelayanan) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Informasi Kontak Terpadu */}
            <Card className="bg-white p-6 border-l-4 border-l-brand-primary shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-brand-secondary mb-5 border-b border-gray-100 pb-3">Informasi Kontak</h3>
              
              <div className="flex flex-col gap-5">
                {/* Alamat */}
                <div className="flex items-start gap-3">
                  <IconBox icon={MapPin} size="sm" variant="brand" className="bg-brand-secondary/5 text-brand-primary shrink-0" circle />
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-0.5">Alamat Kantor</p>
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                      {contactData.address.street}, {contactData.address.area}, {contactData.address.city}, {contactData.address.province} {contactData.address.postalCode}
                    </p>
                    <a href="#maps" className="text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors inline-block">
                      Lihat di Google Maps &rarr;
                    </a>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex items-center gap-3">
                  <IconBox iconSrc={phoneLogo} size="sm" variant="default" className="bg-gray-100 text-gray-600 shrink-0" circle />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{contactData.contactLinks.phone.platform}</p>
                    <p className="text-sm text-gray-600">{contactData.contactLinks.phone.value}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <IconBox iconSrc={gmailLogo} size="sm" variant="error" className="bg-rose-50 shrink-0" circle />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{contactData.contactLinks.email.platform}</p>
                    <p className="text-sm text-gray-600">{contactData.contactLinks.email.value}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <IconBox iconSrc={whatsappLogo} size="sm" variant="success" className="bg-green-50 shrink-0" circle />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{contactData.contactLinks.whatsapp.platform}</p>
                    <p className="text-sm text-gray-600">{contactData.contactLinks.whatsapp.value}</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-3">
                  <IconBox iconSrc={instagramLogo} size="sm" variant="brand" className="bg-pink-50 shrink-0" circle />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{contactData.contactLinks.instagram.platform}</p>
                    <a href={contactData.contactLinks.instagram.url} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">
                      {contactData.contactLinks.instagram.value}
                    </a>
                  </div>
                </div>

                {/* Garis Pemisah */}
                <hr className="my-2 border-gray-100" />

                {/* Jam Pelayanan (Vertikal Layout) */}
                <div className="flex items-start gap-3">
                  <IconBox icon={Clock} size="sm" variant="warning" className="bg-amber-50 text-amber-600 shrink-0" circle />
                  <div className="w-full">
                    <p className="text-sm font-bold text-gray-800 mb-2">Jam Pelayanan</p>
                    
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="text-sm font-bold text-gray-700">Senin–Kamis</p>
                        <p className="text-sm text-gray-600">08.00–15.00 WIB</p>
                        <p className="text-xs text-rose-500 font-medium mt-0.5">Istirahat: 12.00–13.00 WIB</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-700">Jumat</p>
                        <p className="text-sm text-gray-600">08.00–11.00 WIB</p>
                        <p className="text-xs text-rose-500 font-medium mt-0.5">Istirahat: 11.30–13.00 WIB</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Card>
          </div>

          {/* RIGHT SIDE: 60% (Peta Lokasi) */}
          <div className="lg:col-span-7 flex flex-col gap-6" id="maps">
            <Card className="bg-white p-0 border border-border-subtle shadow-sm overflow-hidden flex flex-col h-[500px] md:h-full min-h-[500px] relative group">
              <div className="p-4 bg-white border-b border-border-subtle flex items-center justify-between shrink-0 z-10 shadow-sm">
                <h3 className="text-lg font-bold text-brand-secondary flex items-center gap-2">
                  <Navigation size={20} className="text-brand-primary" /> Peta Lokasi
                </h3>
              </div>
              <div className="w-full h-full bg-gray-200 relative z-0 flex-grow">
                <iframe 
                  src={contactData.mapsIframe} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Lokasi Disdukcapil Kota Tegal"
                ></iframe>
                {/* Overlay Button Maps dihapus agar lebih ringan dan mengurangi tombol ekstra */}
              </div>
            </Card>
          </div>

        </section>

        {/* 5. Frequently Asked Questions (FAQ) */}
        <section className="bg-white p-6 md:p-8 rounded-card border border-border-subtle shadow-sm mt-4">
          <SectionTitle title="Pertanyaan Umum (FAQ)" className="mb-6" />
          <div className="flex flex-col gap-3">
            {contactData.faqs.slice(0, 3).map((faq, index) => (
              <Card key={index} className="border border-border-subtle shadow-none overflow-hidden p-0">
                <button
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:bg-gray-100"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-bold text-brand-secondary text-left text-sm md:text-base pr-4">{faq.question}</span>
                  <ChevronDown size={20} className={`text-brand-primary transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-4 bg-white text-gray-700 text-sm border-t border-border-subtle">
                    {faq.answer}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default Kontak;
