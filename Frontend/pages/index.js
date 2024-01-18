// pages/index.js
import React, { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/search?query=${searchQuery}&filter=${filter}&sort=${sort}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]); // Ensure to set an empty array in case of an error
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, filter, sort]);

  return (
    <div className="container mx-auto my-8">
      <SearchInput
        setSearchQuery={setSearchQuery}
        setFilter={setFilter}
        setSort={setSort}
        setSearchResults={setSearchResults} /* Pass setSearchResults as a prop */
      />

      {/* Display search results */}
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            {result.name} - Price: {result.price} - Source: {result.source} - Manufacturer: {result.manufacturer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
