// components/SearchInput.js
import React from 'react';

const SearchInput = ({ setSearchQuery, setFilter, setSort, setSearchResults }) => {
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/search?query=${searchQuery}&filter=${filter}&sort=${sort}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        className="border p-2 rounded-md mr-2"
      />

      <select onChange={handleFilterChange} className="mr-2">
        <option value="">Filter</option>
        {/* Add filter options here */}
      </select>

      <select onChange={handleSortChange}>
        <option value="">Sort</option>
        {/* Add sort options here */}
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchInput;
