/**
 * Props for the FilterDropdown component.
 */
interface FilterDropdownProps {
  filter: string;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * FilterDropdown component to select the type of filter for searching posts.
 * 
 * @param {FilterDropdownProps} props - The props for the component.
 * @param {string} props.filter - The current filter value.
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} props.onFilterChange - Handler for changing the filter value.
 * @returns {JSX.Element} The rendered FilterDropdown component.
 */
const FilterDropdown: React.FC<FilterDropdownProps> = ({ filter, onFilterChange }) => {
  return (
    <select
      value={filter}
      onChange={onFilterChange}
      className="p-2 border border-gray-400 rounded ml-2"
      style={{ width: '150px', height: '40px' }}
    >
      <option value="title">Filter by Title</option>
      <option value="content">Filter by Content</option>
      <option value="images">Filter by Images</option>
    </select>
  );
};

export default FilterDropdown;
