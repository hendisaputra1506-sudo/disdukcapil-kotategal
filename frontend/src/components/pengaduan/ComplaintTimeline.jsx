import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import IconBox from '../ui/IconBox';
import { Send, FileSearch, RefreshCw, CheckCircle } from 'lucide-react';
import { complaintData } from '../../data/complaint';

const iconMap = [Send, FileSearch, RefreshCw, CheckCircle];

const ComplaintTimeline = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-card border border-border-subtle shadow-sm">
      <SectionTitle title="Alur Penanganan" subtitle="Prosedur Pengaduan" className="mb-8" />
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 justify-between relative">
        {/* Garis konektor desktop */}
        <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-gray-200 -z-10" />

        {/* Garis konektor mobile */}
        <div className="lg:hidden absolute left-6 top-12 bottom-12 w-0.5 bg-gray-200 -z-10" />

        {complaintData.timeline.map((item, index) => {
          const Icon = iconMap[index % iconMap.length];
          const isLast = index === complaintData.timeline.length - 1;
          return (
            <div key={item.step} className="flex lg:flex-col items-start lg:items-center gap-4 lg:text-center w-full relative z-0">
              <IconBox 
                icon={Icon} 
                size="md" 
                variant={isLast ? "brand" : "white"} 
                circle 
                className={`${isLast ? 'bg-brand-primary text-white border-0' : 'border-2 border-brand-primary text-brand-primary bg-white'} z-10 shrink-0 mx-0 lg:mx-auto shadow-sm`} 
              />
              <div>
                <h4 className="font-bold text-brand-secondary text-base lg:mt-2">
                  <span className="text-brand-primary mr-1">{item.step}.</span> {item.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplaintTimeline;
