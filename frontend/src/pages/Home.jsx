import React from 'react';
import ContentWithSidebarLayout from '../layouts/ContentWithSidebarLayout';
import HeroSection from '../components/home/HeroSection';
import LatestNewsSection from '../components/home/LatestNewsSection';
import RightSidebar from '../components/global/RightSidebar';
import FeaturedServicesSection from '../components/home/FeaturedServicesSection';

const Home = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Banner Area */}
      <HeroSection />

      {/* 2. Main Content (Berita + Layanan) & Sidebar */}
      <div className="pt-14 md:pt-16 pb-16 md:pb-20 bg-gray-50 border-b border-border-subtle">
        <ContentWithSidebarLayout 
          mainContent={
            <>
              <LatestNewsSection />
              <FeaturedServicesSection />
            </>
          }
          sidebarContent={<RightSidebar />}
        />
      </div>
    </div>
  );
};

export default Home;
