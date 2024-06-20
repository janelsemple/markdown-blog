// src/app/components/SearchBar.tsx
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  defaultQuery?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultQuery = '', onSearch }) => {
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search blog posts..."
        className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
