import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import PageLayout from '../layouts/PageLayout';
import ArticleContent from '../components/shared/ArticleContent';
import InfoCard from '../components/shared/InfoCard';
import { servicesData } from '../data/services';

const LayananDetail = () => {
  const { slug } = useParams();
  
  // Cari data layanan berdasarkan slug
  const service = servicesData.find(s => s.slug === slug);

  // Jika layanan tidak ditemukan, kembalikan ke halaman daftar layanan
  if (!service) {
    return <Navigate to="/layanan" replace />;
  }

  return (
    <PageLayout 
      title={service.title} 
      breadcrumbItems={[
        { label: 'Layanan', path: '/layanan' },
        { label: service.title, path: `/layanan/${slug}` }
      ]}
    >
      <div className="bg-white rounded-card shadow-sm border border-border-subtle overflow-hidden">
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-border-subtle bg-gray-50/50">
          <Link to="/layanan" className="inline-flex items-center text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors mb-4 focus-visible:outline-none focus-visible:underline">
            <ArrowLeft size={16} className="mr-1.5" /> Kembali ke Daftar Layanan
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-secondary mb-3">{service.title}</h1>
          <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <InfoCard 
            variant="warning"
            title="Pemberitahuan Penting"
            message="Seluruh pengurusan layanan administrasi kependudukan di Kota Tegal TIDAK DIPUNGUT BIAYA (GRATIS)."
            className="mb-8"
          />

          <ArticleContent content={service.content} />
        </div>
      </div>
    </PageLayout>
  );
};

export default LayananDetail;
