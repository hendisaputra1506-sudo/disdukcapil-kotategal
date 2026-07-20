import PropTypes from 'prop-types';
import PageBanner from '../ui/PageBanner';
import Breadcrumb from '../ui/Breadcrumb';
import GlobalSidebar from './GlobalSidebar';

const PageLayout = ({ bannerTitle, breadcrumbs, children, heroImage }) => {
  return (
    <div className="w-full bg-gray-50 pb-16 min-h-screen">
      
      {/* 1. Page Banner */}
      <PageBanner title={bannerTitle} />
      
      {/* 2. Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}

      <div className="container-main pt-6 md:pt-8">
        
        {/* 3. Opsional: Hero Image Horizontal */}
        {heroImage && (
          <div className="w-full mb-8">
            <img 
              src={heroImage} 
              alt="Hero Image" 
              className="w-full aspect-[21/9] md:aspect-[32/9] object-cover rounded-md shadow-sm border border-gray-200"
            />
          </div>
        )}

        {/* 4. Two-Column Layout Utama */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Sisi Kiri: Main Content Area (Lebar 8/12) */}
          <main 
            className="w-full lg:w-8/12 bg-white rounded-md border border-gray-200 p-6 md:p-10 shadow-sm"
          >
            {children}
          </main>

          {/* Sisi Kanan: Global Sidebar (Lebar 4/12) */}
          <div className="w-full lg:w-4/12 shrink-0">
             <GlobalSidebar />
          </div>

        </div>
      </div>
      
    </div>
  );
};

PageLayout.propTypes = {
  bannerTitle: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array,
  children: PropTypes.node.isRequired,
  heroImage: PropTypes.string,
};

export default PageLayout;
