import React from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilter
}) => {
  return <div className="flex flex-col sm:flex-row gap-2 mb-6">
      <div className="relative flex-grow">
        <input type="text" placeholder="Search accounts..." className="w-full pl-10 pr-4 py-2 border rounded-md" onChange={e => onSearch(e.target.value)} />
        <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="relative">
        <select className="appearance-none bg-white pl-10 pr-8 py-2 border rounded-md" onChange={e => onFilter(e.target.value)} defaultValue="">
          <option value="">All TH Levels</option>
          <option value="14">TH 14</option>
          <option value="13">TH 13</option>
          <option value="12">TH 12</option>
          <option value="11">TH 11</option>
          <option value="10">TH 10</option>
        </select>
        <FilterIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>;
};
export default SearchBar;