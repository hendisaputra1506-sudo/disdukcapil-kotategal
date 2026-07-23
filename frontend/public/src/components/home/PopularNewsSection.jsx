import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import SectionTitle from '../ui/SectionTitle';
import { Clock, ChevronRight } from 'lucide-react';

const PopularNewsSection = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback data
  const fallbackNews = [
    {
      id: 'fn1',
      slug: '#',
      title: 'Jadwal Perekaman KTP-el Jemput Bola Bulan November',
      date: '10 Nov 2026'
    },
    {
      id: 'fn2',
      slug: '#',
      title: 'Panduan Mengurus Akta Kelahiran Secara Online',
      date: '08 Nov 2026'
    },
    {
      id: 'fn3',
      slug: '#',
      title: 'Perubahan Jam Pelayanan Selama Bulan Ramadhan',
      date: '05 Nov 2026'
    },
    {
      id: 'fn4',
      slug: '#',
      title: 'Waspada Calo! Semua Layanan Adminduk GRATIS',
      date: '02 Nov 2026'
    }
  ];

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        setIsLoading(true);
        // Let's get page 2 so it differs from the top news grid
        const response = await newsService.getNews(2, 4);
        if (response?.data && response.data.length > 0) {
          const normalizedData = response.data.map(item => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            date: new Date(item.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
          }));
          setNews(normalizedData);
        } else {
          setNews(fallbackNews);
        }
      } catch (error) {
        console.error('Error fetching popular news:', error);
        setNews(fallbackNews);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularNews();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-12">
        <SectionTitle title="Berita Pilihan" />
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between items-end mb-6">
        <SectionTitle title="Berita Pilihan" />
      </div>
      
      <div className="flex flex-col gap-3">
        {news.map((item) => (
          <Link 
            key={item.id} 
            to={`/berita/${item.slug}`}
            className="group flex items-center p-4 bg-white rounded-xl border border-border-subtle shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
          >
            <div className="w-2 h-2 rounded-full bg-brand-primary mr-4 opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all"></div>
            <div className="flex-grow">
              <h3 className="text-brand-secondary font-bold text-sm md:text-base leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center text-gray-400 text-xs mt-1.5 font-medium">
                <Clock size={12} className="mr-1" />
                <span>{item.date}</span>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all ml-4 shrink-0" size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularNewsSection;
