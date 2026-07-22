import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, ThumbsUp, MessageCircle, Link as LinkIcon } from 'lucide-react';
import PageLayout from '../layouts/PageLayout';
import SectionContainer from '../components/shared/SectionContainer';
import ArticleContent from '../components/shared/ArticleContent';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import NewsCard from '../components/shared/NewsCard';
import { newsService } from '../services/newsService';

const BeritaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await newsService.getNewsById(id);
        
        if (response?.data) {
          setNews(response.data);
          
          // Fetch berita terkait (recent news)
          const relatedResponse = await newsService.getNews({ limit: 4 });
          if (relatedResponse?.data) {
            // Filter out current news and limit to 3
            const filtered = relatedResponse.data
              .filter(item => String(item.id) !== String(id))
              .slice(0, 3);
            setRelatedNews(filtered);
          }
        } else {
          setError('Berita tidak ditemukan');
        }
      } catch (err) {
        console.error('Failed to fetch news detail:', err);
        setError('Gagal memuat detail berita. Berita mungkin sudah dihapus atau tidak ditemukan.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link berhasil disalin!');
  };

  // Loading State
  if (isLoading) {
    return (
      <PageLayout 
        title="Memuat Berita..." 
        breadcrumbItems={[
          { label: 'Berita', path: '/informasi' },
          { label: 'Detail', path: '#' }
        ]}
      >
        <SectionContainer background="white" className="rounded-card border border-border-subtle shadow-sm overflow-hidden" noContainer>
          <div className="p-6 md:p-8">
            <div className="skeleton h-8 w-1/4 mb-6"></div>
            <div className="skeleton h-12 w-full mb-4"></div>
            <div className="skeleton h-12 w-3/4 mb-8"></div>
            <div className="skeleton h-64 w-full mb-8 rounded-md"></div>
            <div className="skeleton h-6 w-full mb-3"></div>
            <div className="skeleton h-6 w-full mb-3"></div>
            <div className="skeleton h-6 w-5/6 mb-6"></div>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  // Error State / Not Found
  if (error || !news) {
    return (
      <PageLayout 
        title="Berita Tidak Ditemukan" 
        breadcrumbItems={[
          { label: 'Berita', path: '/informasi' },
          { label: 'Error', path: '#' }
        ]}
      >
        <div className="card bg-red-50 border-red-200 text-center py-16">
          <p className="text-red-600 mb-6 font-medium text-lg">{error || 'Berita tidak ditemukan.'}</p>
          <button 
            className="btn btn-outline border-red-300 text-red-700 hover:bg-red-100" 
            onClick={() => navigate('/informasi')}
          >
            Kembali ke Daftar Berita
          </button>
        </div>
      </PageLayout>
    );
  }

  const formattedDate = new Date(news.publishedAt || news.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <PageLayout 
      title={news.title} 
      breadcrumbItems={[
        { label: 'Berita', path: '/informasi' },
        { label: 'Detail', path: `/informasi/${id}` }
      ]}
    >
      <SectionContainer background="white" className="rounded-card border border-border-subtle shadow-sm !py-0 !px-0 overflow-hidden" noContainer>
        {/* Detail Header & Meta */}
        <div className="p-6 md:p-8 md:pb-6">
          <Link to="/informasi" className="inline-flex items-center text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors mb-4 focus-visible:outline-none focus-visible:underline">
            <ArrowLeft size={16} className="mr-1.5" /> Kembali ke Daftar Berita
          </Link>
          
          <div className="mb-4">
            <Badge variant="brand">{news.category}</Badge>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-secondary mb-4 leading-tight">
            {news.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><Calendar size={16} /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><User size={16} /> Disdukcapil Kota Tegal</span>
            <span className="flex items-center gap-1.5"><Tag size={16} /> Berita</span>
          </div>
        </div>

        {/* Hero Image */}
        {news.thumbnail && (
          <div className="w-full bg-gray-100">
            <img 
              src={news.thumbnail} 
              alt={news.title} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <ArticleContent content={news.content} />
          
          {/* Share Section */}
          <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-brand-secondary">
              <Share2 size={18} />
              <span>Bagikan artikel ini:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-sm font-bold rounded-button hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
              >
                <ThumbsUp size={16} /> Facebook
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white text-sm font-bold rounded-button hover:bg-sky-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
              >
                <MessageCircle size={16} /> Twitter
              </a>
              <button 
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-bold rounded-button hover:bg-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
              >
                <LinkIcon size={16} /> Salin Link
              </button>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Berita Terkait */}
      {relatedNews.length > 0 && (
        <SectionContainer background="gray" className="!py-0 bg-transparent mt-10" noContainer>
          <div className="flex items-center justify-between mb-6">
            <SectionTitle title="Berita Terkait" className="!mb-0" />
            <Link to="/informasi" className="hidden sm:inline-flex items-center text-sm font-bold text-brand-primary hover:text-brand-secondary">
              Lihat Semua
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((related) => (
              <NewsCard 
                key={related.id}
                id={related.id}
                slug={related.slug}
                title={related.title}
                date={new Date(related.publishedAt || related.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                author="Disdukcapil Kota Tegal"
                category={related.category}
                image={related.thumbnail}
                excerpt={related.excerpt}
                baseUrl="/informasi"
              />
            ))}
          </div>
        </SectionContainer>
      )}
    </PageLayout>
  );
};

export default BeritaDetail;
