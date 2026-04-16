import { useState, useEffect } from 'react';
import { getBookmarks } from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { FiBookmark } from 'react-icons/fi';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getBookmarks();
        setBookmarks(data);
        setBookmarkedIds(data.map((n) => n._id));
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleBookmarkToggle = (id) => {
    setBookmarks((prev) => prev.filter((n) => n._id !== id));
    setBookmarkedIds((prev) => prev.filter((b) => b !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
          <FiBookmark className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Bookmarks</h1>
          <p className="text-gray-400 text-sm">{bookmarks.length} saved article{bookmarks.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={6} />
      ) : bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FiBookmark className="w-12 h-12 text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No bookmarks yet</h3>
          <p className="text-gray-500 text-sm">Save articles from the news feed to read later</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((item) => (
            <NewsCard
              key={item._id}
              news={item}
              bookmarkedIds={bookmarkedIds}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
