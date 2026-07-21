import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

/**
 * Komponen HeroMainCard (Homepage Component).
 * Menampilkan berita utama di Hero Banner dengan ukuran penuh.
 */
const HeroMainCard = ({ slug, title, category, image }) => {
  return (
    <Link to={`/berita/${slug}`} className="group relative block w-full h-full rounded-card overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col items-start">
        <Badge variant="brand" className="mb-4 shadow-sm">{category}</Badge>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight group-hover:text-yellow-400 transition-colors line-clamp-3 drop-shadow-sm">
          {title}
        </h2>
      </div>
    </Link>
  );
};

HeroMainCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default HeroMainCard;
