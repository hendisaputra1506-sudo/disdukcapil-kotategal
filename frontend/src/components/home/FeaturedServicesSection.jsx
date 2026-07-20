import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionContainer from '../shared/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import ServiceCard from '../shared/ServiceCard';
import Button from '../ui/Button';
import { servicesData } from '../../data/services';

const FeaturedServicesSection = () => {
  // Ambil 6 layanan pertama (karena mock data sudah berisi tepat 6 layanan utama)
  const featuredServices = servicesData.slice(0, 6);

  return (
    <section>
      <SectionTitle title="Layanan Administrasi" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {featuredServices.map(service => (
          <ServiceCard 
            key={service.id}
            slug={service.slug}
            title={service.title}
            iconName={service.iconName}
            description={service.description}
          />
        ))}
      </div>

      <div className="flex justify-start">
        <Link to="/layanan" tabIndex={-1} className="focus-visible:outline-none">
          <Button variant="primary" rightIcon={<ArrowRight size={18} />}>
            Lihat Semua Layanan
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;
