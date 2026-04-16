const CATEGORIES = ['All', 'Technology', 'Sports', 'Business', 'Entertainment', 'Politics', 'Health', 'General'];

const CategoryFilter = ({ active, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
            active === cat
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
