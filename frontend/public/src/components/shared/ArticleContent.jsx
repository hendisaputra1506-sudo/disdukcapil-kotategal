import PropTypes from 'prop-types';

/**
 * Komponen ArticleContent Reusable (Shared Component).
 * Pembungkus konten teks panjang (rich text / HTML) yang menerapkan gaya dari Tailwind Typography Plugin.
 *
 * @param {Object} props
 * @param {string} props.content - String berformat HTML yang berasal dari database/CMS
 * @param {string} [props.className=''] - Kelas Tailwind tambahan
 */
const ArticleContent = ({ content, className = '' }) => {
  return (
    <div 
      className={`prose prose-gray max-w-none 
        prose-headings:font-bold prose-headings:text-brand-secondary 
        prose-h2:text-2xl prose-h3:text-xl
        prose-p:text-gray-600 prose-p:leading-relaxed
        prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-card prose-img:shadow-sm
        prose-ul:list-disc prose-ol:list-decimal
        ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

ArticleContent.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ArticleContent;
