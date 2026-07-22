import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Komponen Pagination Reusable (UI Kit).
 * Menampilkan kontrol navigasi halaman data dengan dukungan aksesibilitas keyboard.
 *
 * @param {Object} props
 * @param {number} props.currentPage - Nomor halaman aktif saat ini
 * @param {number} props.totalPages - Total keseluruhan halaman
 * @param {Function} props.onPageChange - Callback saat halaman diklik (menerima nomor halaman)
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={`flex items-center justify-center gap-1.5 ${className}`} aria-label="Pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-button border border-border-subtle text-text-main hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        aria-label="Previous Page"
      >
        <ChevronLeft size={18} />
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-button font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
            ${currentPage === page 
              ? 'bg-brand-primary text-white border border-brand-primary' 
              : 'border border-border-subtle text-text-main hover:bg-gray-50'}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-button border border-border-subtle text-text-main hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        aria-label="Next Page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Pagination;
