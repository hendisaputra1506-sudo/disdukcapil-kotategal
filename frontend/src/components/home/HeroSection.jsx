import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroMainCard from './HeroMainCard';
import HeroThumbnailCard from './HeroThumbnailCard';
import SectionContainer from '../shared/SectionContainer';
import { newsData } from '../../data/news';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  
  // Carousel news
  const featuredNews = newsData.slice(0, 5);
  // Thumbnails (berita lainnya)
  const thumbnailNews = newsData.slice(1, 5); 
  
  const scrollRef = useRef(null);

  // Auto-scroll for Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const width = scrollRef.current.clientWidth;
        let nextIndex = Math.round(scrollRef.current.scrollLeft / width) + 1;
        if (nextIndex >= featuredNews.length) nextIndex = 0;
        
        scrollRef.current.scrollTo({
          left: nextIndex * width,
          behavior: 'smooth'
        });
        setCurrentIndex(nextIndex);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredNews.length]);

  // Auto-change for Headline Ticker
  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % newsData.length);
    }, 4000);
    return () => clearInterval(tickerTimer);
  }, []);

  const handleScroll = (e) => {
    const width = e.target.clientWidth;
    const index = Math.round(e.target.scrollLeft / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  if (featuredNews.length === 0) return null;
  const currentTicker = newsData[tickerIndex];

  return (
    <SectionContainer background="white" className="pt-6 pb-12 md:pt-8 md:pb-16 border-b border-border-subtle">
      
      {/* Headline Ticker */}
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full overflow-hidden shadow-sm mb-6">
        <div className="bg-brand-primary text-white font-bold px-5 py-2 text-sm md:text-base shrink-0 uppercase tracking-wider">
          Headline
        </div>
        <div className="px-4 w-full overflow-hidden">
          <Link 
            to={`/berita/${currentTicker.slug}`} 
            className="block text-gray-700 hover:text-brand-primary font-medium hover:underline transition-colors truncate w-full"
            title={currentTicker.title}
          >
            {currentTicker.title}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Left Side: Carousel */}
        <div className="lg:col-span-8 relative w-full h-[240px] md:h-[360px] lg:h-[460px] rounded-card overflow-hidden group shadow-md">
          {/* CSS for hiding scrollbar */}
          <style>{`
            .hero-slider::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Swipeable Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory hero-slider"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredNews.map((news) => (
              <div key={news.id} className="w-full h-full shrink-0 snap-center relative">
                <HeroMainCard {...news} />
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {featuredNews.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                  index === currentIndex ? 'bg-brand-primary w-8' : 'bg-white/70 hover:bg-white w-2.5'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Thumbnails */}
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
