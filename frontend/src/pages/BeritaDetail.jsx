import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, ThumbsUp, MessageCircle, Link as LinkIcon } from 'lucide-react';
import PageLayout from '../layouts/PageLayout';
import SectionContainer from '../components/shared/SectionContainer';
import ArticleContent from '../components/shared/ArticleContent';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import NewsCard from '../components/shared/NewsCard';
import Feedback from '../components/ui/Feedback';
import { newsData } from '../data/news';

const dummyNewsContent = `
  <p><strong>TEGAL</strong> - Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal terus berinovasi dalam memberikan pelayanan prima kepada masyarakat. Salah satu inovasi terbaru yang diluncurkan adalah peningkatan kualitas layanan administrasi kependudukan yang kini dapat diakses secara lebih cepat dan transparan.</p>
  
  <p>Dalam sambutannya, Kepala Disdukcapil Kota Tegal menyampaikan bahwa inovasi ini merupakan bentuk komitmen pemerintah daerah untuk mempermudah urusan administrasi masyarakat. "Kami menyadari bahwa dokumen kependudukan seperti KTP, KK, dan Akta Kelahiran adalah kebutuhan dasar masyarakat yang harus dipenuhi dengan cepat dan tanpa biaya," ujarnya.</p>

  <h3>Peningkatan Infrastruktur Digital</h3>
  <p>Untuk mendukung pelayanan yang maksimal, Disdukcapil Kota Tegal telah melakukan peningkatan infrastruktur digital. Masyarakat kini dapat melakukan antrean secara online dan melacak status penyelesaian dokumen kependudukan mereka melalui aplikasi resmi. Hal ini sejalan dengan program nasional untuk mewujudkan <em>Smart City</em> dan <em>e-Government</em> yang terintegrasi.</p>
  
  <blockquote>"Pelayanan yang membahagiakan masyarakat adalah prioritas utama kami. Tidak ada lagi proses yang berbelit-belit jika semua berkas persyaratan sudah dipenuhi."</blockquote>
  
  <h3>Partisipasi Aktif Masyarakat</h3>
  <p>Disdukcapil juga mengimbau seluruh warga Kota Tegal untuk lebih proaktif dalam memperbarui data kependudukan mereka, terutama bagi warga yang baru pindah, mengalami perubahan status perkawinan, atau adanya kelahiran baru dalam keluarga. Pembaruan data yang cepat sangat penting agar data statistik kependudukan kota tetap akurat dan relevan untuk berbagai keperluan pembangunan.</p>
`;

const BeritaDetail = () => {
  const { slug } = useParams();
  
  // Cari data berita berdasarkan slug
  const news = newsData.find(n => n.slug === slug);

  // Jika berita tidak ditemukan, kembalikan ke halaman daftar berita
  if (!news) {
    return <Navigate to="/berita" replace />;
  }

  // Ambil 3 berita terkait selain berita yang sedang dibaca
  const relatedNews = newsData.filter(n => n.id !== news.id).slice(0, 3);

  return (
    <PageLayout 
      title={news.title} 
      breadcrumbItems={[
        { label: 'Berita', path: '/berita' },
        { label: 'Detail', path: `/berita/${slug}` }
      ]}
    >
      <SectionContainer background="white" className="rounded-card border border-border-subtle shadow-sm !py-0 !px-0 overflow-hidden" noContainer>
        {/* Detail Header & Meta */}
        <div className="p-6 md:p-8 md:pb-6">
          <Link to="/berita" className="inline-flex items-center text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors mb-4 focus-visible:outline-none focus-visible:underline">
            <ArrowLeft size={16} className="mr-1.5" /> Kembali ke Daftar Berita
          </Link>
          
          <div className="mb-4">
            <Badge variant="brand">{news.category}</Badge>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-secondary mb-4 leading-tight">
            {news.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><Calendar size={16} /> {news.date}</span>
            <span className="flex items-center gap-1.5"><User size={16} /> {news.author}</span>
            <span className="flex items-center gap-1.5"><Tag size={16} /> Berita</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-video bg-gray-100">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <ArticleContent content={dummyNewsContent} />
          
          {/* Share Section */}
          <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-brand-secondary">
              <Share2 size={18} />
              <span>Bagikan artikel ini:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-sm font-bold rounded-button hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600">
                <ThumbsUp size={16} /> Facebook
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white text-sm font-bold rounded-button hover:bg-sky-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500">
                <MessageCircle size={16} /> Twitter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-bold rounded-button hover:bg-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300">
                <LinkIcon size={16} /> Salin Link
              </button>
            </div>
          </div>
        </div>

        {/* Galeri Dokumentasi */}
        <div className="p-6 md:p-8 bg-gray-50 border-t border-border-subtle">
          <SectionTitle title="Galeri Dokumentasi" subtitle="Dokumentasi kegiatan terkait berita ini" className="!mb-6" />
          <Feedback 
            state="empty" 
            message="Belum ada dokumentasi foto tambahan untuk artikel ini." 
            className="bg-white"
          />
        </div>
      </SectionContainer>

      {/* Berita Terkait */}
      {relatedNews.length > 0 && (
        <SectionContainer background="gray" className="!py-0 bg-transparent mt-10" noContainer>
          <div className="flex items-center justify-between mb-6">
            <SectionTitle title="Berita Terkait" className="!mb-0" />
            <Link to="/berita" className="hidden sm:inline-flex items-center text-sm font-bold text-brand-primary hover:text-brand-secondary">
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
                date={related.date}
                author={related.author}
                category={related.category}
                image={related.image}
                excerpt={related.excerpt}
              />
            ))}
          </div>
        </SectionContainer>
      )}
    </PageLayout>
  );
};

export default BeritaDetail;
