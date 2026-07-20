import React from 'react';
import HeroMainCard from './HeroMainCard';
import HeroThumbnailCard from './HeroThumbnailCard';
import SectionContainer from '../shared/SectionContainer';
import { newsData } from '../../data/news';

const HeroSection = () => {
  // Menggunakan mock data. Jika data kurang dari 5, kita menduplikasinya untuk kebutuhan visual grid
  const extendedNews = [...newsData, ...newsData, ...newsData].slice(0, 5);
  
  if (extendedNews.length === 0) return null;

  const mainNews = extendedNews[0];
  const thumbnailNews = extendedNews.slice(1, 5);

  return (
    <SectionContainer background="white" className="pt-8 pb-12 md:pt-12 md:pb-16 border-b border-border-subtle">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-8 h-[240px] md:h-[360px] lg:h-[460px]">
          <HeroMainCard {...mainNews} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4 h-auto lg:h-[460px]">
          {thumbnailNews.map((news, index) => (
            <HeroThumbnailCard key={`${news.id}-${index}`} {...news} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
