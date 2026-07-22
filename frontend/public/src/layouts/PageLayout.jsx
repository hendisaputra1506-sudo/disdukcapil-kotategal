import PropTypes from 'prop-types';
import PageBanner from '../components/global/PageBanner';
import RightSidebar from '../components/global/RightSidebar';
import ContentWithSidebarLayout from './ContentWithSidebarLayout';

const PageLayout = ({ title, breadcrumbItems, children, showSidebar = true }) => {
  return (
    <>
      <PageBanner title={title} breadcrumbItems={breadcrumbItems} />
      <div className="py-10 md:py-16 bg-gray-50">
        <ContentWithSidebarLayout 
          mainContent={children} 
          sidebarContent={showSidebar ? <RightSidebar /> : null} 
        />
      </div>
    </>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbItems: PropTypes.array,
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
};

export default PageLayout;
