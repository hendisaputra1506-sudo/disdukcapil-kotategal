import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { newsService } from '../../services/newsService';

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await newsService.getNews({ limit: 3 });
        if (response?.data) {
          setNews(response.data);
        }
        setError(null);
      } catch (err) {
        setError('Gagal memuat berita. Silakan muat ulang halaman.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // --- RENDERING STATES ---

  // 1. Loading State (Skeleton)
  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold uppercase text-brand-secondary tracking-wide border-b-2 border-brand-primary pb-2 inline-block w-fit">
          Berita Terbaru
        </h2>
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((skeletonIndex) => (
            <div key={skeletonIndex} className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-md border border-gray-100">
              <div className="skeleton w-full md:w-64 h-40 shrink-0"></div>
              <div className="flex flex-col flex-grow py-2">
                <div className="skeleton h-6 w-3/4 mb-3"></div>
                <div className="skeleton h-4 w-1/4 mb-4"></div>
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-4 w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="card bg-red-50 border-red-200 text-center py-12">
        <p className="text-red-600 mb-4 font-medium">{error}</p>
        <button className="btn btn-outline border-red-300 text-red-700 hover:bg-red-100" onClick={() => window.location.reload()}>
          Muat Ulang
        </button>
      </div>
    );
  }

  // 3. Empty State
  if (!isLoading && news.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="icon-box bg-gray-100 border-gray-200 text-gray-400 mx-auto mb-4 scale-150">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <p className="text-gray-500 font-medium">Belum ada berita yang diterbitkan.</p>
      </div>
    );
  }

  // 4. Success State (Content)
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-8 border-b border-border-subtle pb-2">
         <h2 className="text-xl md:text-2xl font-bold uppercase text-brand-secondary tracking-wide border-b-2 border-brand-primary pb-2 -mb-[3px]">
           Berita Terbaru
         </h2>
      </div>

      <div className="flex flex-col gap-8">
        {news.map((item) => (
          <article key={item.id} className="group flex flex-col md:flex-row gap-6 bg-white hover:bg-gray-50/50 rounded-md border border-gray-200 p-4 md:p-5 transition-colors shadow-sm">
            
            {/* Thumbnail (Sisi Kiri di Desktop) */}
            <div className="w-full md:w-64 shrink-0 overflow-hidden rounded-sm cursor-pointer border border-gray-200/60">
              <Link to={`/informasi/${item.id}`}>
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover aspect-[16/9] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
            </div>
            
            {/* Teks Konten (Sisi Kanan di Desktop) */}
            <div className="flex flex-col flex-grow justify-center">
              <Link to={`/informasi/${item.id}`} className="focus-visible:outline-none rounded-sm">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-brand-primary group-focus-visible:text-brand-primary transition-colors leading-snug mb-2">
                  {item.title}
                </h3>
              </Link>
              <div className="flex items-center text-sm font-medium text-gray-500 mb-3 gap-2">
                <span>{item.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{new Date(item.publishedAt || item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base line-clamp-2 md:line-clamp-3">
                {item.excerpt}
              </p>
            </div>
            
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center md:justify-start">
        <Link to="/informasi" className="btn btn-outline px-8 group">
          Lihat Semua Berita <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default LatestNews;
