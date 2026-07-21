import PropTypes from 'prop-types';

/**
 * Komponen Badge Reusable (UI Kit).
 * Digunakan untuk menampilkan label status, kategori, atau notifikasi singkat.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Teks di dalam badge
 * @param {'brand'|'info'|'success'|'warning'|'error'|'neutral'} [props.variant='brand'] - Tema warna badge
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const Badge = ({ children, variant = 'brand', className = '' }) => {
  const baseStyle = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider";
  
  const variants = {
    brand: "bg-blue-100 text-brand-primary",
    info: "bg-sky-100 text-sky-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-rose-100 text-rose-700",
    neutral: "bg-gray-100 text-gray-700"
  };
  
  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['brand', 'info', 'success', 'warning', 'error', 'neutral']),
  className: PropTypes.string,
};

export default Badge;
