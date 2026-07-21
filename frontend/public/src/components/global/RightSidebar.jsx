import React from 'react';
import { Link } from 'react-router-dom';
import WidgetCard from '../shared/WidgetCard';
import { sidebarData } from '../../data/sidebar';
import { contactData } from '../../data/contact';

const RightSidebar = () => {
  return (
    <aside className="w-full">
      <WidgetCard title="Layanan Online">
        <div className="flex flex-col gap-4">
          <a 
            href={sidebarData.sapaHumanis.link}
            className="block w-full text-center bg-gradient-to-r from-brand-primary to-blue-700 text-white font-extrabold p-5 rounded-button shadow-md hover:shadow-lg transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary"
          >
            {sidebarData.sapaHumanis.title}
            <span className="block text-xs font-medium text-blue-100 mt-1 uppercase tracking-wider">
              Klik Untuk Mengakses
            </span>
          </a>

          <a 
            href={contactData.contactLinks.spanLapor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-r from-rose-600 to-red-700 text-white font-extrabold p-5 rounded-button shadow-md hover:shadow-lg transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-500"
          >
            {contactData.contactLinks.spanLapor.platform}
            <span className="block text-xs font-medium text-rose-100 mt-1 uppercase tracking-wider">
              Layanan Aspirasi dan Pengaduan
            </span>
          </a>
        </div>
      </WidgetCard>

      {/* 3. Informasi Penting (Placeholder e-flyer) */}
      <WidgetCard title="Informasi Penting">
        <div className="flex flex-col gap-4">
          {sidebarData.informasiPenting.map((info) => (
            <a 
              key={info.id} 
              href={info.link} 
              className="block overflow-hidden rounded-card border border-border-subtle shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary group"
            >
              <img src={info.image} alt={info.title} className="w-full h-auto object-contain" />
            </a>
          ))}
        </div>
      </WidgetCard>

      {/* 4. Berita Pilihan */}
      <WidgetCard title="Berita Pilihan">
        <ul className="space-y-4">
          {sidebarData.beritaPilihan.map(item => (
            <li key={item.id} className="group cursor-pointer">
              <Link to={`/berita/${item.slug}`} className="text-sm font-bold text-brand-secondary group-hover:text-brand-primary line-clamp-2 leading-snug transition-colors">
                {item.title}
              </Link>
              <span className="text-xs text-gray-500 mt-1 block font-medium">{item.date}</span>
            </li>
          ))}
        </ul>
      </WidgetCard>
    </aside>
  );
};

export default RightSidebar;
