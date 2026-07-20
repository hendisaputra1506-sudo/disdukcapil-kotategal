import PropTypes from 'prop-types';
import { Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Komponen InfoCard Reusable (Shared Component).
 * Kartu horizontal berisi peringatan, saran, atau informasi spesifik di tengah halaman.
 *
 * @param {Object} props
 * @param {string} [props.title] - Judul tebal info (opsional)
 * @param {React.ReactNode} props.message - Penjelasan detail info
 * @param {'info'|'warning'|'success'|'error'} [props.variant='info'] - Tipe notifikasi visual
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const InfoCard = ({ title, message, variant = 'info', className = '' }) => {
  const variants = {
    info: {
      bg: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-500",
      titleColor: "text-blue-800",
      textColor: "text-blue-700",
      Icon: Info
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-500",
      titleColor: "text-amber-800",
      textColor: "text-amber-700",
      Icon: AlertTriangle
    },
    success: {
      bg: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-500",
      titleColor: "text-emerald-800",
      textColor: "text-emerald-700",
      Icon: CheckCircle
    },
    error: {
      bg: "bg-rose-50 border-rose-200",
      iconColor: "text-rose-500",
      titleColor: "text-rose-800",
      textColor: "text-rose-700",
      Icon: AlertCircle
    }
  };

  const selected = variants[variant];
  const { Icon } = selected;

  return (
    <div className={`p-4 border rounded-card flex items-start gap-4 ${selected.bg} ${className}`}>
      <Icon className={`shrink-0 mt-0.5 ${selected.iconColor}`} size={20} />
      <div>
        {title && <h4 className={`font-bold mb-1 ${selected.titleColor}`}>{title}</h4>}
        <div className={`text-sm leading-relaxed ${selected.textColor}`}>
          {message}
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string,
  message: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
  className: PropTypes.string,
};

export default InfoCard;
