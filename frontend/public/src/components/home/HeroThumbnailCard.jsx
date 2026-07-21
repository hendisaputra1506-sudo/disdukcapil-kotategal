import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Komponen HeroThumbnailCard (Homepage Component).
 * Menampilkan daftar list berita kecil di sisi kanan Hero Banner.
 */
const HeroThumbnailCard = ({ slug, title, date, image }) => {
  return (
    <Link to={`/berita/${slug}`} className="group relative block w-full flex-1 rounded-card overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary min-h-[120px]">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/95 via-brand-secondary/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end">
        <span className="text-brand-accent-yellow text-xs font-bold uppercase tracking-wider mb-1.5 drop-shadow-md">{date}</span>
        <h3 className="text-sm lg:text-base font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2 drop-shadow-sm">
          {title}
        </h3>
      </div>
    </Link>
  );
};

HeroThumbnailCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default HeroThumbnailCard;
