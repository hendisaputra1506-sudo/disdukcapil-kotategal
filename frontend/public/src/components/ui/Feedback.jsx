import PropTypes from 'prop-types';
import { Loader2, Inbox, AlertTriangle } from 'lucide-react';

/**
 * Komponen Feedback Reusable (UI Kit).
 * Menampilkan status asinkron seperti 'loading', 'empty', atau 'error'.
 *
 * @param {Object} props
 * @param {'loading'|'empty'|'error'} props.state - Status saat ini
 * @param {string} [props.message] - Pesan kustom untuk menimpa pesan bawaan
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const Feedback = ({ state, message, className = '' }) => {
  if (state === 'loading') {
    return (
      <div className={`flex flex-col items-center justify-center py-16 text-gray-500 ${className}`}>
        <Loader2 size={32} className="animate-spin mb-4 text-brand-primary" />
        <p className="font-medium text-sm uppercase tracking-wider">{message || 'Memuat Data...'}</p>
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className={`flex flex-col items-center justify-center py-16 text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-card ${className}`}>
        <Inbox size={48} className="mb-4 text-gray-400" />
        <h4 className="font-bold text-lg text-text-main mb-1">Tidak Ada Data</h4>
        <p className="text-sm">{message || 'Belum ada konten yang tersedia saat ini.'}</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-rose-600 bg-rose-50 border border-rose-200 rounded-card ${className}`}>
        <AlertTriangle size={40} className="mb-3" />
        <h4 className="font-bold text-lg mb-1">Terjadi Kesalahan</h4>
        <p className="text-sm">{message || 'Gagal memuat data. Silakan coba lagi.'}</p>
      </div>
    );
  }

  return null;
};

Feedback.propTypes = {
  state: PropTypes.oneOf(['loading', 'empty', 'error']).isRequired,
  message: PropTypes.string,
  className: PropTypes.string,
};

export default Feedback;
