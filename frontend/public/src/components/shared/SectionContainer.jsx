import PropTypes from 'prop-types';

/**
 * Komponen SectionContainer Reusable (Shared Component).
 * Pembungkus seksi halaman (Section) yang otomatis menjaga jarak Y konsisten (padding-y).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Isi section
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 * @param {'white'|'gray'|'brand'} [props.background='white'] - Warna background membentang lebar penuh
 */
const SectionContainer = ({ children, className = '', background = 'white', noContainer = false }) => {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    brand: "bg-brand-secondary text-white",
  };

  return (
    <section className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}>
      {noContainer ? children : (
        <div className="container-main">
          {children}
        </div>
      )}
    </section>
  );
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  background: PropTypes.oneOf(['white', 'gray', 'brand']),
};

export default SectionContainer;
