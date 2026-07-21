import PropTypes from 'prop-types';

/**
 * Layout pembagi konten 70/30 (Main Content / Sidebar).
 * Dapat digunakan oleh Homepage dan inner pages.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.mainContent - Komponen konten utama (kiri)
 * @param {React.ReactNode} props.sidebarContent - Komponen sidebar (kanan)
 */
const ContentWithSidebarLayout = ({ mainContent, sidebarContent }) => {
  return (
    <div className="container-main">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 xl:w-3/4">
          {mainContent}
        </div>
        {sidebarContent && (
          <div className="w-full lg:w-1/3 xl:w-1/4">
            {sidebarContent}
          </div>
        )}
      </div>
    </div>
  );
};

ContentWithSidebarLayout.propTypes = {
  mainContent: PropTypes.node.isRequired,
  sidebarContent: PropTypes.node,
};

export default ContentWithSidebarLayout;
