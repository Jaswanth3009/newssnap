import { useState, useEffect, useCallback } from 'react';
import { getAllNews, fetchNews, getBookmarks } from '../services/api';
import { useAuth } from '../context/AuthContext';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { FiRefreshCw, FiInbox } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadNews = useCallback(async (pg = 1, reset = false) => {
    if (pg === 1) setLoading(true);
    try {
      const params = { page: pg, limit: 9 };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const { data } = await getAllNews(params);

      if (data.news.length === 0 && pg === 1) {
        // Auto-fetch if DB is empty
        await handleFetchNews(false);
        return;
      }
      setNews(reset || pg === 1 ? data.news : (prev) => [...prev, ...data.news]);
      setTotalPages(data.pages);
      setPage(pg);
    } catch {
      toast.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    loadNews(1, true);
  }, [loadNews]);

  useEffect(() => {
    if (user) {
      getBookmarks()
        .then(({ data }) => setBookmarkedIds(data.map((n) => n._id)))
        .catch(() => {});
    }
  }, [user]);

  const handleFetchNews = async (showToast = true) => {
    setFetching(true);
    try {
      await fetchNews();
      if (showToast) toast.success('News refreshed!');
      await loadNews(1, true);
    } catch {
      toast.error('Failed to fetch news. Check your API key.');
    } finally {
      setFetching(false);
    }
  };

  const handleBookmarkToggle = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setNews((prev) => prev.filter((n) => n._id !== id));
  };

  const handleSearch = (val) => {
    setSearch(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          Today's <span className="text-amber-500">Headlines</span>
        </h1>
        <p className="text-gray-400 text-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar onSearch={handleSearch} />
        <button
          onClick={() => handleFetchNews(true)}
          disabled={fetching}
          className="flex items-center gap-2 btn-outline whitespace-nowrap disabled:opacity-50"
        >
          <FiRefreshCw className={`w-4 h-4 ${fetching ? 'animate-spin' : ''}`} />
          {fetching ? 'Refreshing...' : 'Refresh News'}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter active={category} onChange={(cat) => { setCategory(cat); setPage(1); }} />
      </div>

      {/* News Grid */}
      {loading ? (
        <LoadingSkeleton count={9} />
      ) : news.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FiInbox className="w-12 h-12 text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No news found</h3>
          <p className="text-gray-500 text-sm mb-6">Try changing the category or search term</p>
          <button onClick={() => handleFetchNews(true)} className="btn-primary">
            Fetch Latest News
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard
                key={item._id}
                news={item}
                bookmarkedIds={bookmarkedIds}
                onBookmarkToggle={handleBookmarkToggle}
                onDelete={handleDelete}
                showDelete={user?.role === 'admin'}
              />
            ))}
          </div>

          {/* Load More */}
          {page < totalPages && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => loadNews(page + 1)}
                className="btn-outline px-8"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
