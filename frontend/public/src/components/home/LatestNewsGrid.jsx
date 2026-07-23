import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import SectionContainer from '../shared/SectionContainer';
import { Clock } from 'lucide-react';

const LatestNewsGrid = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback data
  const fallbackNews = [
    {
      id: 'fn1',
      slug: '#',
      title: 'Pelayanan Perekaman KTP-el Jemput Bola di Sekolah',
      imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800',
      date: '10 Nov 2026'
    },
    {
      id: 'fn2',
      slug: '#',
      title: 'Sosialisasi Identitas Kependudukan Digital (IKD)',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      date: '08 Nov 2026'
    },
    {
      id: 'fn3',
      slug: '#',
      title: 'Optimalisasi Layanan Administrasi Kependudukan',
      imageUrl: 'https://images.unsplash.com/photo-1531545514251-b159ce87340e?auto=format&fit=crop&q=80&w=800',
      date: '05 Nov 2026'
    }
  ];

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setIsLoading(true);
        // Get 3 latest news
        const response = await newsService.getNews(1, 3);
        if (response?.data && response.data.length > 0) {
          const normalizedData = response.data.map(item => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            imageUrl: item.image_path,
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
        console.error('Error fetching latest news:', error);
        setNews(fallbackNews);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestNews();
  }, []);

  if (isLoading) {
    return (
      <SectionContainer background="white" className="pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse rounded-xl"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer background="white" className="pt-8 pb-12 border-b border-border-subtle">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-primary">Berita Terbaru</h2>
          <div className="w-16 h-1 bg-brand-secondary mt-2 rounded-full"></div>
        </div>
        <Link to="/berita" className="text-brand-secondary hover:text-brand-primary font-medium text-sm md:text-base transition-colors hover:underline">
          Lihat Semua Berita &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link 
            key={item.id} 
            to={`/berita/${item.slug}`}
            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center text-gray-400 text-xs mb-3 font-medium">
                <Clock size={14} className="mr-1.5" />
                <span>{item.date}</span>
              </div>
              <h3 className="text-gray-800 font-bold text-lg leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
};

export default LatestNewsGrid;
