// src/app/components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  defaultQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultQuery = '' }) => {
  return (
    <form action="/search" method="get" className="flex justify-center mb-8">
      <input
        type="text"
        name="query"
        defaultValue={defaultQuery}
        placeholder="Search blog posts..."
        className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
