import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const clear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-xl">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search news headlines..."
        className="input-field pl-11 pr-10"
      />
      {value && (
        <button
          onClick={clear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
