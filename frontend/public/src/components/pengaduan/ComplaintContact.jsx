import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { Mail, Phone, ExternalLink, Clock } from 'lucide-react';
import { contactData } from '../../data/contact';

const ComplaintContact = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-card border border-border-subtle shadow-sm h-full">
      <SectionTitle title="Kontak & Jadwal" subtitle="Informasi Layanan" className="mb-6" />
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-secondary/10 text-brand-primary flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Email Pengaduan</p>
              <p className="font-bold text-brand-secondary">pengaduan@tegalkota.go.id</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">WhatsApp Layanan</p>
              <p className="font-bold text-brand-secondary">{contactData.contactLinks.whatsapp.value}</p>
            </div>
          </div>

          <a 
            href="https://www.lapor.go.id/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-4 group mt-2 p-3 border border-border-subtle rounded-card hover:border-brand-primary hover:bg-brand-secondary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <ExternalLink size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium group-hover:text-brand-primary transition-colors">Portal Nasional</p>
              <p className="font-bold text-brand-secondary group-hover:text-brand-primary transition-colors">SP4N LAPOR!</p>
            </div>
          </a>
        </div>

        <div className="pt-6 border-t border-border-subtle">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-brand-primary" />
            <h4 className="font-bold text-brand-secondary">Jam Pelayanan Pengaduan</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <span className="font-medium text-gray-600">Senin–Kamis</span>
              <div className="text-right">
                <p className="font-bold text-gray-800">08.00–12.00</p>
                <p className="text-xs text-rose-500 font-medium">Istirahat 12.00–13.00</p>
                <p className="font-bold text-gray-800">13.00–16.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Jumat</span>
              <div className="text-right">
                <p className="font-bold text-gray-800">08.00–11.30</p>
                <p className="text-xs text-rose-500 font-medium">Istirahat 11.30–13.00</p>
                <p className="font-bold text-gray-800">13.00–14.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintContact;
