import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Baby, Activity, LayoutTemplate, User, CheckCircle, Clock, Monitor } from 'lucide-react';
import ContentWithSidebarLayout from '../layouts/ContentWithSidebarLayout';
import HeadlineTicker from '../components/home/HeadlineTicker';
import HeroGallery from '../components/home/HeroGallery';
import LatestNewsGrid from '../components/home/LatestNewsGrid';
import RightSidebar from '../components/global/RightSidebar';
import FeaturedServicesSection from '../components/home/FeaturedServicesSection';
import PopularNewsSection from '../components/home/PopularNewsSection';
import Card from '../components/ui/Card';
import SectionContainer from '../components/shared/SectionContainer';

const Home = () => {
  const quickServices = [
    { title: 'KTP Elektronik', icon: User, slug: 'persyaratan-ktp' },
    { title: 'Kartu Keluarga', icon: Users, slug: 'persyaratan-kk' },
    { title: 'Akta Kelahiran', icon: Baby, slug: 'persyaratan-akta-kelahiran' },
    { title: 'Akta Kematian', icon: Activity, slug: 'persyaratan-akta-kematian' },
    { title: 'Pindah Datang', icon: LayoutTemplate, slug: 'persyaratan-pindah' },
    { title: 'IKD', icon: FileText, slug: 'identitas-kependudukan-digital' }
  ];

  const stats = [
    { label: 'Jenis Layanan', value: '23', icon: FileText },
    { label: 'Pelayanan Gratis', value: '100%', icon: CheckCircle },
    { label: 'Jam Operasional', value: 'Senin - Jumat', icon: Clock },
    { label: 'Berbasis Digital', value: 'Pelayanan', icon: Monitor }
  ];

  return (
    <div className="w-full">
      {/* 0. Headline Ticker */}
      <HeadlineTicker />

      {/* 1. Hero Gallery Carousel */}
      <HeroGallery />
      
      {/* 1.5. Latest News Grid */}
      <LatestNewsGrid />

      {/* 2. Quick Services (Shortcut Layanan) */}
      <SectionContainer className="bg-white pb-4 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card key={idx} hoverable className="text-center group border-border-subtle">
                <Link to={`/layanan/${service.slug}`} className="block p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-card">
                  <div className="w-12 h-12 mx-auto rounded-full bg-brand-light/30 flex items-center justify-center mb-3 group-hover:bg-brand-primary group-hover:text-white transition-colors text-brand-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-brand-secondary group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                </Link>
              </Card>
            );
          })}
        </div>
      </SectionContainer>

      {/* 3. Transition Section & Statistics */}
      <SectionContainer className="bg-white pt-2 pb-8 text-center">
        <div className="max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-brand-secondary mb-3 uppercase tracking-tight">
            Layanan Unggulan Disdukcapil Kota Tegal
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Kami berkomitmen memberikan pelayanan administrasi kependudukan yang cepat, tepat, dan transparan. Melalui inovasi dan integrasi data, kami berupaya memastikan setiap warga Kota Tegal mendapatkan kemudahan dalam mengurus dokumen kependudukan secara profesional.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-4 flex flex-col items-center justify-center border-border-subtle shadow-sm bg-gray-50/50">
                <Icon size={24} className="text-brand-primary mb-2 opacity-80" />
                <div className="text-xl md:text-2xl font-black text-brand-secondary leading-tight">{stat.value}</div>
                <div className="text-xs md:text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </SectionContainer>

      {/* 4. Main Content (Berita + Layanan) & Sidebar */}
      <div className="pt-8 md:pt-10 pb-16 md:pb-20 bg-gray-50 border-b border-border-subtle">
        <ContentWithSidebarLayout 
          mainContent={
            <>
              <FeaturedServicesSection />
              <PopularNewsSection />
            </>
          }
          sidebarContent={<RightSidebar />}
        />
      </div>
    </div>
  );
};

export default Home;
