import React from 'react';
import PageLayout from '../layouts/PageLayout';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import { FileText, Monitor, Users, Layers, CheckCircle, Clock } from 'lucide-react';
import HendiPhoto from '../assets/Hendi.jpg';
import LogoUTD from '../assets/Logo UTD.png';
import instagramLogo from '../assets/icons/instagram.svg';

const AboutProject = () => {
  const breadcrumbItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Tentang Website' }
  ];

  const stats = [
    { label: 'Public Pages', value: '15+', icon: FileText },
    { label: 'Reusable Components', value: '30+', icon: Layers },
    { label: 'Responsive Layout', value: '100%', icon: Monitor },
    { label: 'Developer Count', value: '1', icon: Users },
  ];

  const contributions = [
    'Business Analysis',
    'BRD Documentation',
    'UI/UX Design',
    'Frontend Development',
    'Responsive Testing',
    'Deployment'
  ];

  const techStack = [
    'React', 'Vite', 'Tailwind CSS', 'React Router DOM', 'Lucide React', 'Vercel'
  ];

  const sprints = [
    { name: 'Business Requirement Document', status: 'done' },
    { name: 'UI/UX Design', status: 'done' },
    { name: 'Design System', status: 'done' },
    { name: 'Frontend Development', status: 'done' },
    { name: 'Backend Development', status: 'pending' },
    { name: 'API Integration', status: 'pending' }
  ];

  return (
    <PageLayout
      title="Tentang Website"
      breadcrumb={breadcrumbItems}
    >
      {/* Hero Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-brand-secondary mb-4">Proyek Akademik</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Website ini merupakan prototype frontend Website Publik Dinas Kependudukan dan Pencatatan Sipil Kota Tegal yang dikembangkan sebagai proyek akademik Program Studi D3 Manajemen Informatika Universitas Teknologi Digital Tegal.
        </p>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-4 text-center border-t-4 border-t-brand-primary">
              <div className="w-10 h-10 mx-auto rounded-full bg-brand-light flex items-center justify-center mb-3">
                <Icon size={20} className="text-brand-primary" />
              </div>
              <div className="text-2xl font-bold text-brand-secondary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Developer Profile & Deployment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Developer Profile */}
        <Card className="p-6 lg:col-span-2 flex flex-col md:flex-row gap-6 items-start">
          <div className="shrink-0 w-full md:w-auto flex justify-center">
            <img 
              src={HendiPhoto} 
              alt="Hendi Saputra" 
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl shadow-md border-[3px] border-white"
            />
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-brand-secondary">Hendi Saputra</h3>
                <p className="text-brand-primary font-semibold mb-2">Frontend Developer</p>
                
                {/* Instagram Link */}
                <a 
                  href="https://instagram.com/hend.i2109" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-sm text-gray-600 hover:text-pink-600 transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <img src={instagramLogo} alt="Instagram" className="w-4 h-4 mr-2" />
                  @hend.i2109
                </a>
              </div>

              {/* Logo UTD */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <img src={LogoUTD} alt="Universitas Teknologi Digital Tegal" className="h-10 w-auto object-contain" />
                <div className="text-xs text-gray-600">
                  <p className="font-semibold text-brand-secondary">D3 Manajemen Informatika</p>
                  <p>Universitas Teknologi Digital Tegal</p>
                </div>
              </div>
            </div>

            {/* Contributions */}
            <div className="border-t border-gray-100 pt-4 mt-2">
              <h4 className="text-sm font-bold text-brand-secondary uppercase tracking-wider mb-3">Developer Contribution</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {contributions.map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Deployment Info */}
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <SectionTitle title="Deployment" className="mb-4 text-lg" />
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">Platform</span>
                <span className="text-sm font-bold text-brand-secondary">Vercel</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm font-bold text-green-600 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">Version</span>
                <span className="text-sm font-bold text-gray-700">v1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Update</span>
                <span className="text-sm font-bold text-gray-700">Juli 2026</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-brand-light/30 border-brand-light">
            <SectionTitle title="Tech Stack" className="mb-4 text-lg" />
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white border border-brand-light text-brand-secondary text-xs font-semibold rounded-md shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Project Progress */}
      <Card className="p-6 mb-10">
        <SectionTitle title="Development Roadmap" className="mb-6" />
        <div className="space-y-4">
          {sprints.map((sprint, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-4 ${sprint.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                {sprint.status === 'done' ? <CheckCircle size={18} /> : <Clock size={18} />}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${sprint.status === 'done' ? 'text-brand-secondary' : 'text-gray-500'}`}>
                  {sprint.name}
                </p>
              </div>
              {sprint.status === 'pending' && (
                <span className="shrink-0 ml-4 px-2.5 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
        <div className="flex">
          <div className="shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Disclaimer:</strong> Halaman web ini merupakan purwarupa (prototype) proyek akademik untuk keperluan penyusunan Laporan Tugas Akhir dan <strong>bukan</strong> website resmi instansi terkait.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutProject;
