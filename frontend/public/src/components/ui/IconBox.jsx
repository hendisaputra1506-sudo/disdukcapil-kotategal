import PropTypes from 'prop-types';

/**
 * Komponen IconBox Reusable (UI Kit).
 * Wadah pembungkus ikon dengan latar belakang dan bentuk simetris yang konsisten.
 *
 * @param {Object} props
 * @param {React.ElementType} props.icon - Komponen Ikon (misal dari lucide-react)
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Ukuran wadah dan ikon
 * @param {'brand'|'secondary'|'outline'|'white'} [props.variant='brand'] - Tema warna latar belakang
 * @param {boolean} [props.circle=false] - Jika true, kotak membulat sempurna (rounded-full)
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 * @param {string} [props.iconSrc] - URL/path gambar lokal (misal .svg/.png) untuk menggantikan komponen icon
 */
const IconBox = ({ icon: Icon, iconSrc, size = 'md', variant = 'brand', circle = false, className = '' }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };
  
  const variants = {
    brand: "bg-blue-50 text-brand-primary",
    secondary: "bg-gray-800 text-white",
    outline: "border-2 border-border-subtle text-text-main",
    white: "bg-white shadow-sm text-brand-primary"
  };
  
  const roundedStyle = circle ? "rounded-full" : "rounded-button";
  
  return (
    <div className={`flex items-center justify-center shrink-0 ${sizes[size]} ${variants[variant]} ${roundedStyle} ${className}`}>
      {iconSrc ? (
        <img src={iconSrc} alt="Icon" width={iconSizes[size]} height={iconSizes[size]} className="object-contain" />
      ) : Icon ? (
        <Icon size={iconSizes[size]} />
      ) : null}
    </div>
  );
};

IconBox.propTypes = {
  icon: PropTypes.elementType,
  iconSrc: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['brand', 'secondary', 'outline', 'white', 'success', 'warning', 'error', 'default']),
  circle: PropTypes.bool,
  className: PropTypes.string,
};

export default IconBox;
