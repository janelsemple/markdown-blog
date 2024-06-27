'use client';
import { useState, useEffect, useRef } from 'react';
import FilterDropdown from './FilterDropdown';

let timeoutId: NodeJS.Timeout;

/**
 * Debounces a function by the specified delay.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
const debounce = (func: (...args: any[]) => void, delay: number) => {
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface SearchBarProps {
  query: string;
  filter?: string;
}

/**
 * SearchBar component for inputting search queries and selecting filters.
 * @param {SearchBarProps} props - The component props.
 * @returns {JSX.Element} - The rendered SearchBar component.
 */
const SearchBar = ({ query, filter = 'title' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [currentFilter, setCurrentFilter] = useState(filter);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchQuery(query);
    setCurrentFilter(filter);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [query, filter]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedPerformSearch(event.target.value, currentFilter);
  };

  const performSearch = (search: string, filter: string) => {
    if (search.trim() === '') {
      window.location.href = '/';
    } else {
      window.location.href = `/search?search=${search}&filter=${filter}`;
    }
  };

  const debouncedPerformSearch = debounce(performSearch, 600);

  return (
    <div className="flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search blog posts..."
        className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery && (
        <FilterDropdown
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          debouncedPerformSearch={debouncedPerformSearch}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default SearchBar;
