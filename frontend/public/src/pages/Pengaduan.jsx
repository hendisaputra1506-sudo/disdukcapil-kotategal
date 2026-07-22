import React from 'react';
import PageLayout from '../layouts/PageLayout';
import SectionTitle from '../components/ui/SectionTitle';

// Sub-components
import ComplaintForm from '../components/pengaduan/ComplaintForm';
import ComplaintTimeline from '../components/pengaduan/ComplaintTimeline';
import ComplaintRights from '../components/pengaduan/ComplaintRights';
import ComplaintContact from '../components/pengaduan/ComplaintContact';
import ComplaintFAQ from '../components/pengaduan/ComplaintFAQ';

const Pengaduan = () => {
  return (
    <PageLayout 
      title="Pusat Pengaduan" 
      breadcrumbItems={[
        { label: 'Pengaduan', path: '/pengaduan' }
      ]}
    >
      <div className="flex flex-col gap-10">
        
        {/* Section 1 & 2: Header & Form Pengaduan */}
        <section>
          <div className="mb-6">
            <SectionTitle title="Pusat Pengaduan Masyarakat" className="!mb-2" />
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Silakan menyampaikan kritik, saran, maupun pengaduan terkait pelayanan administrasi kependudukan Disdukcapil Kota Tegal. Seluruh laporan akan diproses sesuai prosedur yang berlaku.
            </p>
          </div>
          <ComplaintForm />
        </section>

        {/* Section 3: Timeline Alur Pengaduan */}
        <section>
          <ComplaintTimeline />
        </section>

        {/* Section 4 & 5: Hak Masyarakat & Informasi Kontak */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ComplaintRights />
          <ComplaintContact />
        </section>

        {/* Section 6: FAQ Accordion */}
        <section>
          <ComplaintFAQ />
        </section>

      </div>
    </PageLayout>
  );
};

export default Pengaduan;
