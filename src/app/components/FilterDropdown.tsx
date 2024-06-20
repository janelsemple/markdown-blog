interface FilterDropdownProps {
  filter: string;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filter, onFilterChange }) => {
  return (
    <select
      value={filter}
      onChange={onFilterChange}
      className="p-2 border border-gray-400 rounded ml-2"
      style={{ width: '150px', height: '40px'}}
    >
      <option value="title">Filter by Title</option>
      <option value="content">Filter by Content</option>
      <option value="both">Filter by Both</option>
    </select>
  );
};

export default FilterDropdown;
