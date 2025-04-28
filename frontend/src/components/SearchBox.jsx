import React, { useState } from 'react';

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-64 mr-2"
      />
      <button
        type='button'
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBox;
