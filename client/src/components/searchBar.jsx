import React, { useState } from 'react';
import { apiRequest } from '../services/api';

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await apiRequest(`/customers/search?q=${query}`);
    onResults(data);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mb-6">
      <input 
        type="text" 
        className="flex-1 border p-2 rounded" 
        placeholder="Search by ID or Name..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">Search</button>
    </form>
  );
};

export default SearchBar;