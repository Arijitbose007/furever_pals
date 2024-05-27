// Buddies.jsx
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import Navbar from "../components/Navbar";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import Catalog from "../components/Catalog";

const Buddies = () => {
  const customStyle = true;
  const showAboutUs = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [actualSearchQuery, setActualSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const filters = ["Location", "Pet Type", "Gender", "Breed"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
    setIsFilterDropdownOpen(false); // Close dropdown after selection
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleSearch = () => {
    setActualSearchQuery(searchQuery);
  };

  return (
    <>
      <Navbar
        showAboutUs={showAboutUs}
        customStyle={customStyle}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isSupportMenuOpen={isSupportMenuOpen}
        toggleSupportMenu={toggleSupportMenu}
      />
      <div className="search-bar-container flex justify-center p-4 relative">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by name, number, city, etc..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 pr-10 rounded-lg border border-gray-300 w-full"
          />
          <button
            onClick={toggleFilterDropdown}
            className="absolute right-0 top-0 mt-2 mr-2 p-1 rounded-lg border border-gray-300 bg-white text-black"
          >
            <FiFilter size={20} />
          </button>
        </div>
        {isFilterDropdownOpen && (
          <div className="absolute top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 bg-opacity-50">
            <div className="p-4 flex flex-col">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => selectFilter(filter)}
                  className={`p-2 m-1 rounded-lg border ${selectedFilter === filter ? 'bg-blue text-white' : 'bg-blue-400 text-black'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleSearch}
          className="ml-2 p-2 rounded-lg border border-gray-300 bg-customPurple text-white sm:mt-2 md:mt-0 lg:mt-0"
        >
          Search
        </button>
      </div>
      <Catalog isCarousel={false} searchQuery={actualSearchQuery} selectedFilter={selectedFilter} />
      <BackToTop />
      
    </>
  );
};

export default Buddies;
