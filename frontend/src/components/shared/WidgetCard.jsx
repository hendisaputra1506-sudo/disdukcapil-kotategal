import PropTypes from 'prop-types';
import Card from '../ui/Card';

/**
 * Komponen WidgetCard Reusable (Shared Component).
 * Modifikasi Card yang ditujukan khusus untuk wadah elemen Right Sidebar (Sapahumanis, Tautan, dll).
 *
 * @param {Object} props
 * @param {string} [props.title] - Judul widget di atas kotak konten
 * @param {React.ReactNode} props.children - Konten di dalam widget (list link, gambar banner, dll)
 * @param {boolean} [props.noPadding=false] - Jika true, menghapus padding bawaan dari isi widget
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const WidgetCard = ({ title, children, noPadding = false, className = '' }) => {
  return (
    <Card className={`mb-8 ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-border-subtle bg-gray-50/50">
          <h3 className="text-sm font-bold text-brand-secondary uppercase tracking-widest relative pl-3">
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-full"></span>
            {title}
          </h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>
        {children}
      </div>
    </Card>
  );
};

WidgetCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  noPadding: PropTypes.bool,
  className: PropTypes.string,
};

export default WidgetCard;
