import PropTypes from 'prop-types';

/**
 * Komponen PageHeader Reusable (Shared Component).
 * Header khusus untuk awal halaman (apabila tidak memakai PageBanner utama) atau awal seksi tertentu.
 *
 * @param {Object} props
 * @param {string} props.title - Judul halaman
 * @param {string} [props.description] - Penjelasan singkat di bawah judul
 * @param {'left'|'center'|'right'} [props.align='left'] - Perataan teks horizontal
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const PageHeader = ({ title, description, align = 'left', className = '' }) => {
  const alignments = {
    left: "text-left",
    center: "text-center flex flex-col items-center",
    right: "text-right flex flex-col items-end"
  };

  return (
    <div className={`mb-8 ${alignments[align]} ${className}`}>
      <h1 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 text-sm md:text-base max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
};

export default PageHeader;
