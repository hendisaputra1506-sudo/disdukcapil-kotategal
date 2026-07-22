import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full py-4 bg-white border-b border-border-subtle">
      <div className="container-main">
        <ol className="flex items-center space-x-2 text-sm text-text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {isLast ? (
                  <span className="font-medium text-brand-primary" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <a 
                      href={item.href || '#'} 
                      className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </a>
                    <ChevronRight size={14} className="mx-2 text-gray-400" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
