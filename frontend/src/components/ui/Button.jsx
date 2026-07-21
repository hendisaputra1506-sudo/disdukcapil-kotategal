import PropTypes from 'prop-types';

/**
 * Komponen Button Reusable (UI Kit).
 * Digunakan untuk aksi pengguna dengan mendukung variasi gaya, ukuran, dan ikon.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label atau isi tombol
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - Variasi warna/gaya
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Ukuran tombol
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 * @param {Function} [props.onClick] - Fungsi aksi saat tombol diklik
 * @param {boolean} [props.disabled] - Status non-aktif
 * @param {React.ReactNode} [props.leftIcon] - Ikon (Lucide) di sisi kiri teks
 * @param {React.ReactNode} [props.rightIcon] - Ikon (Lucide) di sisi kanan teks
 */
const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, leftIcon, rightIcon, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-blue-700 shadow-sm hover:shadow-md",
    secondary: "bg-brand-secondary text-white hover:bg-gray-800 shadow-sm",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
    ghost: "text-brand-primary hover:bg-blue-50"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  
  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="mr-2.5">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2.5">{rightIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default Button;
