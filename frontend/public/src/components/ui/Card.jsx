import PropTypes from 'prop-types';

/**
 * Komponen Card Reusable (UI Kit).
 * Wadah dasar untuk mengelompokkan informasi dengan radius dan border konsisten.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Konten di dalam card
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 * @param {boolean} [props.hoverable=false] - Jika true, memberikan efek bayangan terangkat saat di-hover
 */
const Card = ({ children, className = '', hoverable = false }) => {
  const baseStyle = "bg-white rounded-card border border-border-subtle overflow-hidden";
  const hoverStyle = hoverable ? "transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" : "shadow-sm";
  
  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

export default Card;
