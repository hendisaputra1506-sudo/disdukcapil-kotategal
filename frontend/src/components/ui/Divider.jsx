import PropTypes from 'prop-types';

/**
 * Komponen Divider Reusable (UI Kit).
 * Garis pemisah horizontal atau vertikal untuk memisahkan antar elemen UI.
 * Memiliki aria-orientation untuk aksesibilitas.
 *
 * @param {Object} props
 * @param {string} [props.className=''] - Kelas Tailwind tambahan (misal: margin-y)
 * @param {boolean} [props.vertical=false] - Jika true, membuat pemisah vertikal (tinggi penuh, lebar 1px)
 */
const Divider = ({ className = '', vertical = false }) => {
  if (vertical) {
    return <div className={`w-px h-full bg-border-subtle ${className}`} role="separator" aria-orientation="vertical" />;
  }
  return <div className={`h-px w-full bg-border-subtle ${className}`} role="separator" aria-orientation="horizontal" />;
};

Divider.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

export default Divider;
