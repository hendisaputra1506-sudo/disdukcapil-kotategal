import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import NewsCard from '../shared/NewsCard';
import Button from '../ui/Button';
import { newsData } from '../../data/news';

const LatestNewsSection = () => {
  // Tampilkan 6 berita terbaru untuk carousel
  const latestNews = newsData.slice(0, 6);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Perkiraan lebar card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-14 md:mb-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 md:mb-8 gap-4">
        <SectionTitle title="Berita Terbaru" className="mb-0" />
        
        {/* Navigasi Carousel (Desktop) */}
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Berita Sebelumnya"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Berita Selanjutnya"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Carousel Container */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {latestNews.map(news => (
          <div key={news.id} className="snap-start shrink-0 w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <NewsCard {...news} />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-2 md:mt-4">
        <Link to="/berita" tabIndex={-1}>
          <Button variant="outline" rightIcon={<ArrowRight size={18} />}>
            Lihat Semua Berita
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LatestNewsSection;
