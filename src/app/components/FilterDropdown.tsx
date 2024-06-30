'use client';

interface FilterProps {
  currentFilter: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
  debouncedPerformSearch: (search: string, filter: string) => void;
  searchQuery: string;
}

const FilterDropdown = ({ currentFilter, setCurrentFilter, debouncedPerformSearch, searchQuery }: FilterProps) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilter(event.target.value);
    debouncedPerformSearch(searchQuery, event.target.value);
  };

  return (
    <select
      value={currentFilter}
      onChange={handleFilterChange}
      className="ml-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="title">Title</option>
      <option value="content">Content</option>
      <option value="images">Images</option>
    </select>
  );
};

export default FilterDropdown;
