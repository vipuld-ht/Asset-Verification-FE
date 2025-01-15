import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pokemonSearchSvg from "../assets/pokemon-search.svg";
import { toast } from "react-toastify";
import { getPokemon } from "../service/service.js"

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => setSearchQuery(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery) return;

    const toastId = toast.loading("Loading Pokemon...");
    try {
      const response  = await getPokemon(searchQuery);
      toast.update(toastId, {
        render: `Pokémon found for name: ${searchQuery}!`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setSearchQuery('');
      onSearch(response);
    } catch (error) {
      toast.update(toastId, {
        render: `Pokemon not found with given name: ${searchQuery}! Please try again.`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setSearchQuery('');
      onSearch(null);
    }
  };

  return (
    <div className="search-container">
      <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <img 
              src={pokemonSearchSvg} 
              alt="Search icon" 
              className="w-4 h-4 text-gray-500 dark:text-gray-400" 
            />
          </div>
          <input
            type="text"
            id="search"
            value={searchQuery}
            data-testid="search-pokemon-input"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Pokemon..."
            required
          />
        </div>
        <button
          type="submit" data-testid="search-pokemon-button"
          className="btn inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium"
        >
          <svg 
            className="w-4 h-4 me-2" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 20 20"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
