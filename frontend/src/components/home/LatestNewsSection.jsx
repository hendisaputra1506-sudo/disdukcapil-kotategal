import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import NewsCard from '../shared/NewsCard';
import Button from '../ui/Button';
import { newsData } from '../../data/news';

const LatestNewsSection = () => {
  // Sesuai BRD, tampilkan tepat 3 berita terbaru
  const latestNews = newsData.slice(0, 3);

  return (
    <section className="mb-14 md:mb-16">
      <SectionTitle title="Berita Terbaru" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {latestNews.map(news => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>
      <div className="flex justify-center">
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
