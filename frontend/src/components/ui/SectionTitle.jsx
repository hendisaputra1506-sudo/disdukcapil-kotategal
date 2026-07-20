import PropTypes from 'prop-types';

/**
 * Komponen SectionTitle Reusable (UI Kit).
 * Judul terstandarisasi untuk sebuah section, lengkap dengan aksen kuning khas instansi.
 *
 * @param {Object} props
 * @param {string} props.title - Judul utama
 * @param {string} [props.subtitle] - Teks kecil di atas judul (opsional)
 * @param {boolean} [props.centered=false] - Jika true, posisi teks ke tengah (text-center)
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const SectionTitle = ({ title, subtitle, centered = false, className = '' }) => {
  return (
    <div className={`mb-6 md:mb-8 ${centered ? 'text-center flex flex-col items-center' : 'text-left'} ${className}`}>
      {subtitle && (
        <span className="inline-block text-brand-primary font-bold text-sm uppercase tracking-widest mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-brand-secondary tracking-tight">
        {title}
      </h2>
      <div className={`mt-4 h-1.5 w-16 bg-brand-accent-yellow rounded-full`}></div>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
};

export default SectionTitle;
