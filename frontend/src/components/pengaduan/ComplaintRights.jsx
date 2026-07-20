import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const ComplaintRights = () => {
  const rights = [
    "Pelayanan tanpa pungutan liar.",
    "Identitas pelapor dijaga kerahasiaannya.",
    "Pengaduan diproses sesuai SOP.",
    "Pelapor memperoleh informasi tindak lanjut.",
    "Pelayanan diberikan secara profesional dan transparan."
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-card border border-border-subtle shadow-sm">
      <SectionTitle title="Hak Masyarakat Pelapor" subtitle="Komitmen Kami" className="mb-6" />
      <ul className="space-y-4">
        {rights.map((right, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-gray-700 font-medium">{right}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintRights;
