import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * Komponen NewsCard Reusable (Shared Component).
 * Menampilkan ringkasan berita/artikel berupa gambar, meta tanggal, judul, dan tombol aksi.
 *
 * @param {Object} props
 * @param {string|number} props.id - ID unik berita
 * @param {string} props.slug - Slug URL untuk navigasi detail berita
 * @param {string} props.title - Judul berita
 * @param {string} props.date - Tanggal publikasi (terformat)
 * @param {string} props.author - Penulis berita
 * @param {string} props.category - Kategori berita untuk badge
 * @param {string} props.image - URL gambar cover berita
 * @param {string} props.excerpt - Ringkasan singkat berita
 */
const NewsCard = ({ slug, title, date, author, category, image, excerpt }) => {
  return (
    <Card hoverable className="flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="brand">{category}</Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-brand-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-brand-primary" />
            <span>{author}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/berita/${slug}`} className="focus-visible:outline-none focus-visible:underline group-hover:text-brand-primary transition-colors">
          <h3 className="text-lg font-bold text-brand-secondary leading-snug mb-3 line-clamp-2">
            {title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow">
          {excerpt}
        </p>

        {/* Action */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link to={`/berita/${slug}`} tabIndex={-1}>
            <Button variant="ghost" className="px-0 py-0 hover:bg-transparent" rightIcon={<ArrowRight size={16} />}>
              Baca Selengkapnya
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

NewsCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

export default NewsCard;
