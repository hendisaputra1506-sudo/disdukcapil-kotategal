import React, { useState } from 'react';
import { Search, UserCheck, FileCheck, RefreshCw, CheckCircle, Clock, Calendar, HelpCircle, ChevronDown, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import SectionTitle from '../components/ui/SectionTitle';
import ServiceCard from '../components/shared/ServiceCard';
import IconBox from '../components/ui/IconBox';
import Card from '../components/ui/Card';
import InfoCard from '../components/shared/InfoCard';
import Button from '../components/ui/Button';
import { servicesData } from '../data/services';

const Layanan = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      question: "Bagaimana cara membuat e-KTP?",
      answer: "Anda cukup datang ke Kantor Disdukcapil atau TPDK Kecamatan terdekat membawa fotokopi Kartu Keluarga (KK) terbaru. Jika baru pertama kali, Anda wajib mengikuti proses perekaman sidik jari dan iris mata."
    },
    {
      question: "Berapa lama proses pencetakan dokumen?",
      answer: "Secara standar (SOP), dokumen dapat selesai dalam waktu 1 (satu) hari kerja jika seluruh berkas persyaratan dinyatakan lengkap dan jaringan SAK pusat berjalan normal."
    },
    {
      question: "Apakah pengurusan dokumen bisa diwakilkan?",
      answer: "Bisa, asalkan yang mewakili masih dalam satu Kartu Keluarga (KK) yang sama dan membawa dokumen pendukung serta surat kuasa jika diperlukan."
    },
    {
      question: "Bagaimana jika dokumen hilang?",
      answer: "Bagi dokumen hilang (seperti KTP atau KK), silakan mengurus Surat Keterangan Kehilangan dari Kepolisian terlebih dahulu, kemudian bawa surat tersebut ke kantor Disdukcapil."
    }
  ];

  return (
    <PageLayout 
      title="Layanan Administrasi" 
      breadcrumbItems={[
        { label: 'Layanan', path: '/layanan' }
      ]}
    >
      <div className="flex flex-col gap-6 md:gap-8">
        
        {/* 1. Service Statistics (Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-white p-4 border border-border-subtle shadow-sm flex items-center gap-4 hover:border-brand-primary transition-colors">
            <IconBox icon={Clock} size="md" variant="brand" circle className="bg-amber-50 text-amber-600" />
            <div>
              <p className="text-xl font-bold text-brand-secondary leading-tight">5 Hari</p>
              <p className="text-xs text-gray-500 font-medium">Jam Operasional</p>
            </div>
          </Card>
          <Card className="bg-white p-4 border border-border-subtle shadow-sm flex items-center gap-4 hover:border-brand-primary transition-colors">
            <IconBox icon={ShieldCheck} size="md" variant="brand" circle className="bg-rose-50 text-rose-600" />
            <div>
              <p className="text-xl font-bold text-brand-secondary leading-tight">100%</p>
              <p className="text-xs text-gray-500 font-medium">Layanan Gratis</p>
            </div>
          </Card>
        </div>

        {/* 2. Grid Daftar Layanan */}
        <div className="bg-white p-6 md:p-8 rounded-card shadow-sm border border-border-subtle">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <SectionTitle title="Daftar Layanan" className="!mb-0" />
            
            {/* Search UI Sederhana */}
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Cari layanan..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-button border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-gray-50 text-sm"
              />
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {servicesData.map(service => (
              <ServiceCard 
                key={service.id}
                slug={service.slug}
                title={service.title}
                iconName={service.iconName}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* 3. Alur Pengurusan Dokumen */}
        <div className="bg-white p-6 md:p-8 rounded-card shadow-sm border border-border-subtle">
          <SectionTitle title="Alur Pelayanan" className="mb-6" />
          
          <div className="flex flex-col lg:flex-row gap-6 justify-between relative">
            {/* Garis konektor desktop */}
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-gray-200 -z-10" />

            {/* Garis konektor mobile */}
            <div className="lg:hidden absolute left-6 top-12 bottom-12 w-0.5 bg-gray-200 -z-10" />

            <div className="flex lg:flex-col items-center gap-4 lg:text-center w-full relative z-0">
              <IconBox icon={UserCheck} size="md" variant="white" circle className="border-2 border-brand-primary text-brand-primary bg-white z-10 mx-0 lg:mx-auto shadow-sm" />
              <div>
                <h4 className="font-bold text-brand-secondary text-sm md:text-base">Datang</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Datang ke loket</p>
              </div>
            </div>
            
            <div className="flex lg:flex-col items-center gap-4 lg:text-center w-full relative z-0">
              <IconBox icon={FileCheck} size="md" variant="white" circle className="border-2 border-brand-primary text-brand-primary bg-white z-10 mx-0 lg:mx-auto shadow-sm" />
              <div>
                <h4 className="font-bold text-brand-secondary text-sm md:text-base">Ambil Nomor</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Mengambil antrean</p>
              </div>
            </div>

            <div className="flex lg:flex-col items-center gap-4 lg:text-center w-full relative z-0">
              <IconBox icon={RefreshCw} size="md" variant="white" circle className="border-2 border-brand-primary text-brand-primary bg-white z-10 mx-0 lg:mx-auto shadow-sm" />
              <div>
                <h4 className="font-bold text-brand-secondary text-sm md:text-base">Verifikasi</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Pemeriksaan berkas</p>
              </div>
            </div>
            
            <div className="flex lg:flex-col items-center gap-4 lg:text-center w-full relative z-0">
              <IconBox icon={Clock} size="md" variant="white" circle className="border-2 border-brand-primary text-brand-primary bg-white z-10 mx-0 lg:mx-auto shadow-sm" />
              <div>
                <h4 className="font-bold text-brand-secondary text-sm md:text-base">Proses</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Input data & cetak</p>
              </div>
            </div>
            
            <div className="flex lg:flex-col items-center gap-4 lg:text-center w-full relative z-0">
              <IconBox icon={CheckCircle} size="md" variant="brand" circle className="bg-brand-primary text-white z-10 mx-0 lg:mx-auto shadow-sm" />
              <div>
                <h4 className="font-bold text-brand-secondary text-sm md:text-base">Selesai</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Terima dokumen</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Persyaratan Umum & Jam Pelayanan */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Persyaratan Umum */}
          <Card className="bg-white p-6 md:p-8 border-border-subtle shadow-sm h-full flex flex-col">
            <SectionTitle title="Persyaratan Umum" className="mb-4" />
            <InfoCard 
              variant="warning"
              title="Perhatian"
              message="Ini adalah prasyarat dasar. Pastikan memeriksa syarat spesifik di detail masing-masing layanan."
              className="mb-6"
            />
            <ul className="space-y-4 text-gray-600 font-medium text-sm lg:text-base list-none">
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-brand-accent-green shrink-0 mt-0.5" />
                <span>Fotokopi Kartu Keluarga (KK)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-brand-accent-green shrink-0 mt-0.5" />
                <span>KTP Asli Lama (Jika mengajukan perubahan)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-brand-accent-green shrink-0 mt-0.5" />
                <span>Surat Pengantar dari RT/RW (Jika diperlukan)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-brand-accent-green shrink-0 mt-0.5" />
                <span>Dokumen Pendukung Lain (Buku Nikah / Ijazah)</span>
              </li>
            </ul>
          </Card>

          {/* Jam Pelayanan Modern Information Cards */}
          <Card className="bg-white p-6 md:p-8 border-border-subtle shadow-sm h-full flex flex-col">
            <SectionTitle title="Jam Pelayanan" className="mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-card">
                <h4 className="font-bold text-brand-primary mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Senin - Kamis
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 font-medium">
                  <li>08.00 - 12.00 WIB</li>
                  <li className="text-red-500">12.00 - 13.00 WIB (Istirahat)</li>
                  <li>13.00 - 16.00 WIB</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-card">
                <h4 className="font-bold text-brand-primary mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Jumat
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 font-medium">
                  <li>08.00 - 11.30 WIB</li>
                  <li className="text-red-500">11.00 - 13.00 WIB (Istirahat)</li>
                  <li>13.00 - 14.00 WIB</li>
                </ul>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
              *Berlaku untuk Kantor Disdukcapil Kota Tegal, TPDK Kecamatan Tegal Selatan, Tegal Timur, Margadana, dan Mall Pelayanan Publik.
            </p>
          </Card>

        </div>

        {/* 5. FAQ Singkat */}
        <div className="bg-white p-6 md:p-8 rounded-card shadow-sm border border-border-subtle">
          <div className="flex items-center gap-3 mb-6">
            <IconBox icon={HelpCircle} size="sm" variant="brand" className="bg-blue-50 text-brand-primary" />
            <h2 className="text-xl font-bold text-brand-secondary">FAQ Pelayanan</h2>
          </div>
          
          <div className="flex flex-col gap-3">
            {faqData.map((faq, index) => (
              <Card key={index} className="border border-border-subtle shadow-none overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:bg-gray-100"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-bold text-brand-secondary text-left text-sm md:text-base">{faq.question}</span>
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
        </div>

        {/* 6. Call To Action */}
        <div className="bg-brand-primary text-white rounded-card p-8 md:p-10 text-center shadow-md">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-white">Butuh Bantuan?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Apabila masih memiliki pertanyaan mengenai layanan administrasi kependudukan, silakan menghubungi petugas kami melalui halaman Kontak atau Ajukan Pengaduan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/kontak">
              <Button variant="outline" size="lg" className="w-full sm:w-auto !bg-white !text-brand-primary !border-white hover:!bg-gray-100 flex items-center justify-center gap-2 shadow-sm">
                <Phone size={18} /> Hubungi Kami
              </Button>
            </Link>
            <Link to="/pengaduan">
              <Button variant="outline" size="lg" className="w-full sm:w-auto !bg-transparent !border-white !text-white hover:!bg-white hover:!text-brand-primary transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={18} /> Ajukan Pengaduan
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default Layanan;
