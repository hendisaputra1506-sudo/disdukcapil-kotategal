import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { complaintData } from '../../data/complaint';

const ComplaintFAQ = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white p-6 md:p-8 rounded-card border border-border-subtle shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
          <HelpCircle size={20} />
        </div>
        <h2 className="text-xl font-bold text-brand-secondary">FAQ Pengaduan</h2>
      </div>
      
      <div className="flex flex-col gap-3">
        {complaintData.faqs.map((faq, index) => (
          <Card key={index} className="border border-border-subtle shadow-none overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:bg-gray-100"
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              aria-expanded={openFaq === index}
            >
              <span className="font-bold text-brand-secondary text-left text-sm md:text-base pr-4">{faq.question}</span>
              <ChevronDown size={20} className={`text-brand-primary transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-4 bg-white text-gray-700 text-sm border-t border-border-subtle">
                {faq.answer}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComplaintFAQ;
