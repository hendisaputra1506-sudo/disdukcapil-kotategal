import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import PropTypes from 'prop-types';

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-brand-primary transition-colors">
            <Home size={14} className="mr-1.5" />
            Beranda
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} aria-current={isLast ? 'page' : undefined}>
              <div className="flex items-center">
                <ChevronRight size={14} className="text-gray-400 mx-1" />
                {isLast ? (
                  <span className="text-gray-100 font-medium ml-1">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-white transition-colors ml-1"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
