import PropTypes from 'prop-types';
import Breadcrumb from './Breadcrumb';

const PageBanner = ({ title, breadcrumbItems, bgImage }) => {
  return (
    <div className="relative bg-brand-secondary mb-10 overflow-hidden">
      {/* Background Image with Overlay */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
      )}
      
      {/* Fallback solid background if no image */}
      {!bgImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-brand-primary-dark z-0"></div>
      )}

      <div className="container-main py-12 md:py-16 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h1>
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      </div>
    </div>
  );
};

PageBanner.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbItems: PropTypes.array,
  bgImage: PropTypes.string,
};

export default PageBanner;
