import React, { useState, useEffect, useRef } from 'react';
import { galleryService } from '../../services/galleryService';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionContainer from '../shared/SectionContainer';

const HeroGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  // Fallback Data Statis jika API gagal atau kosong
  const fallbackGalleries = [
    {
      id: 'fb1',
      title: "Pelayanan Publik Cepat dan Mudah",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 'fb2',
      title: "Fasilitas Publik",
      imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 'fb3',
      title: "Inovasi Pelayanan Digital",
      imageUrl: "https://images.unsplash.com/photo-1531545514251-b159ce87340e?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setIsLoading(true);
        const response = await galleryService.getGalleryList();
        
        if (response?.data && response.data.length > 0) {
          const normalizedData = response.data.map(item => ({
            id: item.id,
            title: item.title,
            imageUrl: item.image_path
          }));
          setGalleries(normalizedData);
        } else {
          setGalleries(fallbackGalleries);
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
        setGalleries(fallbackGalleries);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (galleries.length <= 1) return;
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        let nextIndex = currentIndex + 1;
        if (nextIndex >= galleries.length) nextIndex = 0;
        
        const children = container.querySelectorAll('.gallery-item');
        if (children[nextIndex]) {
           children[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [galleries.length, currentIndex]);

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const children = scrollRef.current.querySelectorAll('.gallery-item');
      if (children[index]) {
        children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        setCurrentIndex(index);
      }
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    const center = container.scrollLeft + container.clientWidth / 2;
    
    const children = container.querySelectorAll('.gallery-item');
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
    }
  };

  if (isLoading) {
    return (
      <SectionContainer background="white" className="pt-2 pb-6">
        <div className="w-full flex justify-center py-4">
          <div className="w-[90%] md:w-[75%] lg:w-[65%] aspect-[16/9] md:aspect-[21/9] bg-gray-200 animate-pulse rounded-2xl"></div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer background="white" className="pt-2 pb-6 border-b border-border-subtle">
      <section aria-label="Galeri Disdukcapil" className="relative w-full overflow-hidden group">
        
        {/* Hide scrollbar CSS */}
        <style>{`
          .peek-slider::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Slider Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory peek-slider items-center pb-8 pt-4 gap-4 md:gap-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Spacer elements for proper centering of first and last items */}
          <div className="shrink-0 w-[2.5vw] md:w-[10vw] lg:w-[15vw]"></div>
          
          {galleries.map((gallery, index) => {
            const isActive = index === currentIndex;
            return (
              <div 
                key={gallery.id} 
                className={`gallery-item shrink-0 w-[85%] md:w-[75%] lg:w-[65%] snap-center rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-out cursor-pointer ${
                  isActive ? 'scale-100 opacity-100 shadow-xl' : 'scale-90 opacity-40 blur-[1px]'
                }`}
                onClick={() => scrollTo(index)}
              >
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
                  <img 
                    src={gallery.imageUrl} 
                    alt={gallery.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle gradient so text is readable if needed, but keeping it minimal for gallery */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 to-transparent p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <h2 className="text-white text-sm md:text-lg font-semibold drop-shadow-md">
                        {gallery.title}
                     </h2>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="shrink-0 w-[2.5vw] md:w-[10vw] lg:w-[15vw]"></div>
        </div>

        {/* Navigation Buttons (visible on desktop hover) */}
        <button 
          onClick={() => scrollTo(currentIndex > 0 ? currentIndex - 1 : galleries.length - 1)}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-brand-primary text-brand-secondary hover:text-white p-2 md:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10 hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scrollTo(currentIndex < galleries.length - 1 ? currentIndex + 1 : 0)}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-brand-primary text-brand-secondary hover:text-white p-2 md:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10 hidden md:block"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {galleries.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </SectionContainer>
  );
};

export default HeroGallery;
