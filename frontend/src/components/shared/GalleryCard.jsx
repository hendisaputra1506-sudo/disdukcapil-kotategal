import PropTypes from 'prop-types';
import { ZoomIn } from 'lucide-react';

/**
 * Komponen GalleryCard Reusable (Shared Component).
 * Menampilkan grid gambar dengan interaksi hover memunculkan efek overlay (zoom).
 *
 * @param {Object} props
 * @param {string} props.title - Judul foto/kegiatan
 * @param {string} props.category - Kategori album
 * @param {string} props.date - Tanggal kegiatan
 * @param {string} props.image - URL gambar thumbnail galeri
 */
const GalleryCard = ({ title, category, date, image }) => {
  return (
    <div className="group relative aspect-[4/3] rounded-card overflow-hidden cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary" tabIndex={0}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/90 via-brand-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-primary mb-2 uppercase tracking-wider">
            <span>{category}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span className="text-gray-300">{date}</span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight mb-4">
            {title}
          </h3>
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-secondary hover:bg-brand-primary hover:text-white transition-colors">
            <ZoomIn size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default GalleryCard;
