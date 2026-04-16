import { useState } from 'react';
import { FiBookmark, FiExternalLink, FiTrash2, FiClock } from 'react-icons/fi';
import { toggleBookmark, deleteNews } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CATEGORY_COLORS = {
  Technology: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Sports: 'bg-green-500/10 text-green-400 border-green-500/20',
  Business: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Entertainment: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Politics: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Health: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  General: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

const NewsCard = ({ news, bookmarkedIds = [], onBookmarkToggle, onDelete, showDelete = false }) => {
  const { user } = useAuth();
  const [bookmarking, setBookmarking] = useState(false);
  const isBookmarked = bookmarkedIds.includes(news._id);

  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (!user) { toast.warn('Please login to bookmark news'); return; }
    setBookmarking(true);
    try {
      await toggleBookmark(news._id);
      onBookmarkToggle && onBookmarkToggle(news._id);
      toast.success(isBookmarked ? 'Bookmark removed' : 'Bookmarked!');
    } catch {
      toast.error('Failed to update bookmark');
    } finally {
      setBookmarking(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this news article?')) return;
    try {
      await deleteNews(news._id);
      onDelete && onDelete(news._id);
      toast.success('Article deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="card group flex flex-col fade-in-up">
      {/* Image */}
      {news.imageUrl && (
        <div className="relative overflow-hidden h-44">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Category + Date */}
        <div className="flex items-center justify-between mb-3">
          <span className={`category-badge border ${CATEGORY_COLORS[news.category] || CATEGORY_COLORS.General}`}>
            {news.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            {formatDate(news.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
          {news.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1 mb-4">
          {news.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <span className="text-xs text-gray-500 font-medium">{news.source}</span>

          <div className="flex items-center gap-2">
            {showDelete && (
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                title="Delete"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleBookmark}
              disabled={bookmarking}
              className={`p-2 rounded-lg transition-all ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-gray-500 hover:text-amber-400 hover:bg-amber-500/10'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <FiBookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {news.originalUrl && news.originalUrl !== '#' && (
              <a
                href={news.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 transition-all"
                title="Read full article"
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
