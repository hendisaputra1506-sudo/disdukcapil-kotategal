import React, { useState } from 'react';
import SectionContainer from '../components/shared/SectionContainer';
import SectionTitle from '../components/ui/SectionTitle';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Divider from '../components/ui/Divider';
import IconBox from '../components/ui/IconBox';
import Pagination from '../components/ui/Pagination';
import Feedback from '../components/ui/Feedback';
import ArticleContent from '../components/shared/ArticleContent';
import InfoCard from '../components/shared/InfoCard';
import NewsCard from '../components/shared/NewsCard';
import ServiceCard from '../components/shared/ServiceCard';
import GalleryCard from '../components/shared/GalleryCard';
import WidgetCard from '../components/shared/WidgetCard';

// Icons
import { Search, Plus, Save, Bell, AlertTriangle } from 'lucide-react';

// Mock Data
import { newsData } from '../data/news';
import { servicesData } from '../data/services';
import { galleryData } from '../data/gallery';
import { sidebarData } from '../data/sidebar';

const UIKit = () => {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Area */}
      <div className="bg-brand-secondary text-white py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-tight">UI Kit & Component Showcase</h1>
          <p className="text-gray-300 max-w-2xl text-lg">Halaman ini adalah referensi tunggal (Single Source of Truth) untuk seluruh komponen React pada proyek Disdukcapil Kota Tegal.</p>
        </div>
      </div>

      {/* TYPOGRAPHY */}
      <SectionContainer background="white" className="shadow-sm">
        <PageHeader title="1. Typography & Content" description="Standar teks dan artikel panjang." />
        <Divider className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle title="Section Title" subtitle="Subtitle Opsional" />
            <h1 className="text-4xl font-bold mb-2 text-brand-secondary">Heading 1</h1>
            <h2 className="text-3xl font-bold mb-2 text-brand-secondary">Heading 2</h2>
            <h3 className="text-2xl font-bold mb-2 text-brand-secondary">Heading 3</h3>
            <h4 className="text-xl font-bold mb-2 text-brand-secondary">Heading 4</h4>
            <p className="text-gray-600 leading-relaxed mt-4">
              Ini adalah contoh paragraf standar. Menggunakan warna abu-abu (gray-600) untuk menjaga keterbacaan agar tidak terlalu kontras di latar belakang putih.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-secondary">Article Content (Prose)</h3>
            <ArticleContent content={`
              <p>Ini adalah konten yang dirender menggunakan <strong>ArticleContent</strong>. Komponen ini otomatis memformat HTML yang berasal dari database.</p>
              <ul>
                <li>Otomatis memberi <em>list-style</em></li>
                <li>Otomatis merapikan spasi paragraf</li>
                <li>Mewarnai tautan menjadi <a href="#">biru brand</a></li>
              </ul>
            `} />
          </div>
        </div>
      </SectionContainer>

      {/* BUTTONS & BADGES */}
      <SectionContainer background="gray">
        <PageHeader title="2. Buttons & Badges" description="Elemen interaktif dan label status." />
        <Divider className="mb-8" />

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-secondary">Button Variants</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-secondary">Button Sizes & Icons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button variant="primary" leftIcon={<Search size={18} />}>Cari Data</Button>
              <Button variant="outline" rightIcon={<Plus size={18} />}>Tambah</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-secondary">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="brand">Brand</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CARDS & ICON BOX */}
      <SectionContainer background="white" className="shadow-sm">
        <PageHeader title="3. Basic Cards & IconBox" description="Wadah dasar untuk komponen lebih kompleks." />
        <Divider className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card className="p-6">
            <h4 className="font-bold mb-2 text-brand-secondary">Static Card</h4>
            <p className="text-sm text-gray-600">Card standar tanpa efek hover. Digunakan untuk wadah statis.</p>
          </Card>
          <Card className="p-6" hoverable>
            <h4 className="font-bold mb-2 text-brand-secondary">Hoverable Card</h4>
            <p className="text-sm text-gray-600">Card dengan efek shadow dan translate-y saat dihover.</p>
          </Card>
        </div>

        <h3 className="text-lg font-bold mb-4 text-brand-secondary">Icon Box</h3>
        <div className="flex flex-wrap gap-6 items-center">
          <IconBox icon={Bell} size="sm" variant="brand" />
          <IconBox icon={Search} size="md" variant="secondary" />
          <IconBox icon={Save} size="lg" variant="outline" />
          <IconBox icon={AlertTriangle} size="md" variant="white" circle />
        </div>
      </SectionContainer>

      {/* INFO CARDS */}
      <SectionContainer background="gray">
        <PageHeader title="4. Info Cards" description="Notifikasi atau peringatan in-page." />
        <Divider className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard 
            title="Informasi Layanan" 
            message="Pelayanan tatap muka dihentikan sementara pada tanggal merah." 
            variant="info" 
          />
          <InfoCard 
            title="Peringatan Dokumen" 
            message="Pastikan NIK yang Anda masukkan sudah benar." 
            variant="warning" 
          />
          <InfoCard 
            title="Berhasil Disimpan" 
            message="Data pengaduan Anda telah masuk ke sistem kami." 
            variant="success" 
          />
          <InfoCard 
            title="Gagal Memuat" 
            message="Tidak dapat terhubung ke server database kependudukan." 
            variant="error" 
          />
        </div>
      </SectionContainer>

      {/* SHARED CARDS (MOCK DATA) */}
      <SectionContainer background="white" className="shadow-sm">
        <PageHeader title="5. Shared Components (Mock Data)" description="Komponen spesifik yang memanggil mock data." />
        <Divider className="mb-8" />

        <SectionTitle title="News Card" subtitle="Komponen Berita" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {newsData.map(news => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>

        <SectionTitle title="Service Card" subtitle="Komponen Layanan" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {servicesData.slice(0, 3).map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        <SectionTitle title="Gallery Card" subtitle="Komponen Galeri" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryData.slice(0, 3).map(item => (
            <GalleryCard key={item.id} {...item} />
          ))}
        </div>
      </SectionContainer>

      {/* WIDGETS & FEEDBACK */}
      <SectionContainer background="gray">
        <PageHeader title="6. Sidebar Widgets & Feedback States" description="Komponen sidebar dan status UI." />
        <Divider className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-8">
            <WidgetCard title="Berita Pilihan">
              <ul className="space-y-4">
                {sidebarData.beritaPilihan.map(item => (
                  <li key={item.id} className="group cursor-pointer">
                    <p className="text-sm font-bold text-brand-secondary group-hover:text-brand-primary line-clamp-2 leading-snug">{item.title}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{item.date}</span>
                  </li>
                ))}
              </ul>
            </WidgetCard>
            
            <WidgetCard title="Tautan Cepat" noPadding>
              <div className="flex flex-col">
                {sidebarData.links.map((link, idx) => (
                  <a key={idx} href={link.url} className="px-5 py-3 border-b border-gray-100 last:border-0 text-sm font-medium hover:bg-brand-primary hover:text-white transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </WidgetCard>
          </div>

          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-brand-secondary">Feedback States</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Feedback state="loading" className="h-48" />
                <Feedback state="empty" className="h-48" />
                <Feedback state="error" className="h-48" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-brand-secondary">Pagination (Interactive)</h3>
              <div className="bg-white p-6 rounded-card shadow-sm flex justify-center">
                <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      
    </div>
  );
};

export default UIKit;
