import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PageLayout from '../layouts/PageLayout';
import SectionContainer from '../components/shared/SectionContainer';
import SectionTitle from '../components/ui/SectionTitle';
import NewsCard from '../components/shared/NewsCard';
import Pagination from '../components/ui/Pagination';
import { newsData } from '../data/news';

const Berita = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const itemsPerPage = 6;
  
  // Ambil daftar kategori unik dari data berita
  const categories = ['Semua', ...new Set(newsData.map(item => item.category))];

  // Filter berita berdasarkan kategori
  const filteredNews = activeCategory === 'Semua' 
    ? newsData 
    : newsData.filter(news => news.category === activeCategory);

  // Hitung paginasi
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
  };

  return (
    <PageLayout 
      title="Daftar Berita" 
      breadcrumbItems={[
        { label: 'Berita', path: '/berita' }
      ]}
    >
      {/* Gunakan SectionContainer dengan noContainer agar tidak double container dengan PageLayout */}
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

        {/* Grid Berita */}
        {currentNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentNews.map((news) => (
              <NewsCard 
                key={news.id}
                id={news.id}
                slug={news.slug}
                title={news.title}
                date={news.date}
                author={news.author}
                category={news.category}
                image={news.image}
                excerpt={news.excerpt}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Tidak Ada Berita</h3>
            <p className="text-gray-500">Belum ada berita untuk kategori "{activeCategory}".</p>
          </div>
        )}

        {/* Paginasi */}
        {totalPages > 1 && (
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
