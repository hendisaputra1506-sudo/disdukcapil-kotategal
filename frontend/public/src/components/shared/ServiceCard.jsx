import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, User, Users, Baby, Activity, LayoutTemplate } from 'lucide-react';
import Card from '../ui/Card';
import IconBox from '../ui/IconBox';

const iconMap = {
  User: User,
  Users: Users,
  Baby: Baby,
  Activity: Activity,
  FileText: FileText,
  LayoutTemplate: LayoutTemplate
};

/**
 * Komponen ServiceCard Reusable (Shared Component).
 * Menampilkan informasi layanan dengan ikon kotak berlatar belakang.
 *
 * @param {Object} props
 * @param {string} props.slug - Slug URL untuk melihat detail syarat layanan
 * @param {string} props.title - Nama layanan (contoh: KTP Elektronik)
 * @param {string} props.iconName - Nama ikon Lucide (merujuk ke iconMap)
 * @param {string} props.description - Penjelasan ringkas mengenai layanan
 */
const ServiceCard = ({ slug, title, iconName, description }) => {
  const IconComponent = iconMap[iconName] || FileText;

  return (
    <Card hoverable className="h-full group">
      <Link to={`/layanan/${slug}`} className="flex flex-col h-full p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-card">
        <IconBox 
          icon={IconComponent} 
          size="lg" 
          variant="brand" 
          className="mb-6 transition-colors group-hover:bg-brand-primary group-hover:text-white"
        />
        <h3 className="text-xl font-bold text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-6 flex-grow">
          {description}
        </p>
        <div className="mt-auto flex items-center text-sm font-bold text-brand-primary uppercase tracking-wider">
          <span>Lihat Syarat</span>
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </Card>
  );
};

ServiceCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ServiceCard;
