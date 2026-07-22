import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import PageLayout from '../layouts/PageLayout';
import SectionContainer from '../components/shared/SectionContainer';
import SectionTitle from '../components/ui/SectionTitle';
import NewsCard from '../components/shared/NewsCard';
import Pagination from '../components/ui/Pagination';
import { newsService } from '../services/newsService';

const Berita = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 6;
  
  // Daftar kategori standar
  const categories = ['Semua', 'Berita', 'Pengumuman', 'Kegiatan', 'Artikel'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const params = {
          page: currentPage,
          limit: itemsPerPage
        };

        if (activeCategory !== 'Semua') {
          params.category = activeCategory;
        }

        if (searchQuery.trim() !== '') {
          params.search = searchQuery;
        }

        const response = await newsService.getNews(params);
        if (response?.data) {
          setNews(response.data);
          setTotalPages(response.pagination?.totalPages || 1);
        } else {
          setNews([]);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Gagal memuat berita. Silakan coba beberapa saat lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, activeCategory, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <PageLayout 
      title="Daftar Berita" 
      breadcrumbItems={[
        { label: 'Berita', path: '/informasi' }
      ]}
    >
      <SectionContainer background="white" className="rounded-card border border-border-subtle shadow-sm !py-8 md:!py-10 !px-6 md:!px-8" noContainer>
        
        {/* Header & Filter Area */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <SectionTitle title="Berita & Pengumuman" className="!mb-2" />
              <p className="text-gray-500 text-sm md:text-base max-w-2xl">
                Kumpulan berita, artikel, dan pengumuman terbaru seputar layanan administrasi kependudukan di Kota Tegal.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <input 
                type="text" 
                placeholder="Cari berita..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-button border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-gray-50 text-sm"
              />
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filter Kategori */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border-subtle">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                  activeCategory === category 
                  ? 'bg-brand-primary text-white border-brand-primary' 
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3, 4, 5, 6].map(skeleton => (
              <div key={skeleton} className="bg-white rounded-md border border-gray-100 overflow-hidden">
                <div className="skeleton w-full aspect-[4/3]"></div>
                <div className="p-4">
                  <div className="skeleton h-4 w-1/3 mb-3"></div>
                  <div className="skeleton h-5 w-full mb-2"></div>
                  <div className="skeleton h-5 w-5/6 mb-4"></div>
                  <div className="skeleton h-4 w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="card bg-red-50 border-red-200 text-center py-12 mb-10">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Grid Berita */}
        {!isLoading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {news.map((item) => (
              <NewsCard 
                key={item.id}
                id={item.id}
                slug={item.slug}
                title={item.title}
                date={new Date(item.publishedAt || item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                author="Disdukcapil Kota Tegal"
                category={item.category}
                image={item.thumbnail}
                excerpt={item.excerpt}
                baseUrl="/informasi"
              />
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && news.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Tidak Ada Berita</h3>
            <p className="text-gray-500">Belum ada berita yang ditemukan.</p>
          </div>
        )}

        {/* Paginasi */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="pt-6 border-t border-border-subtle">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  );
};

export default Berita;
