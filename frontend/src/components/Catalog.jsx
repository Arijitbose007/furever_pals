// src/pages/Catalog.jsx
import React, { useState, useEffect } from "react";
import "../components/Components.css";
import axios from "axios";
import ProtectedButton from "../components/ProtectedButton";

const Catalog = ({ isCarousel, searchQuery, selectedFilters }) => {
  const [approvedDonations, setApprovedDonations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/donate`);
        const allDonations = response.data.data;
        const approvedDonations = allDonations.filter(
          (donation) => donation.status === "Approved"
        );
        setApprovedDonations(approvedDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  useEffect(() => {
    if (isCarousel) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === approvedDonations.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [approvedDonations.length, isCarousel]);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? approvedDonations.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === approvedDonations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const filterItems = (items) => {
    const searchLower = searchQuery.toLowerCase();
    const filters = Array.isArray(selectedFilters) ? selectedFilters : [selectedFilters]; // Ensure selectedFilters is always an array

    return items.filter((item) => {
      const matchesSearchQuery =
        (item.name && item.name.toLowerCase().includes(searchLower)) ||
        (item.number && item.number.toLowerCase().includes(searchLower)) ||
        (item.city && item.city.toLowerCase().includes(searchLower)) ||
        (item.state && item.state.toLowerCase().includes(searchLower)) ||
        (item.petType && item.petType.toLowerCase().includes(searchLower)) ||
        (item.gender && item.gender.toLowerCase().includes(searchLower)) ||
        (item.breed && item.breed.toLowerCase().includes(searchLower));

      const matchesFilters = filters.every((filter) => {
        if (filter === "Location") {
          return (
            (item.city && item.city.toLowerCase().includes(searchLower)) ||
            (item.state && item.state.toLowerCase().includes(searchLower))
          );
        }
        if (filter === "Pet Type") {
          return item.petType && item.petType.toLowerCase().includes(searchLower);
        }
        if (filter === "Gender") {
          return item.gender && item.gender.toLowerCase().includes(searchLower);
        }
        if (filter === "Breed") {
          return item.breed && item.breed.toLowerCase().includes(searchLower);
        }
        return true;
      });

      return matchesSearchQuery && matchesFilters;
    });
  };

  const displayedDonations = searchQuery
    ? filterItems(approvedDonations)
    : approvedDonations;

  if (isCarousel) {
    return (
      <div className="carousel-container">
        <button
          className="carousel-button carousel-button-left"
          onClick={handlePrevSlide}
        >
          &lt;
        </button>
        <div
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {approvedDonations.map((donation) => (
            <div
              key={donation._id}
              className="carousel-slide my-3  rounded-xl overflow-hidden"
            >
              <div className="md:flex rounded-xl  shadow-2xl bg-cardColor">
                <div className="md:shrink-0 w-full md:w-auto">
                  <img
                    className="h-48 md:h-80 w-full object-cover rounded-xl md:w-60 lg:w-80"
                    src={`${import.meta.env.VITE_API_URL}${donation.petImage}`}
                    alt="Pet Image"
                  />
                </div>
                <div className="flex-col">
                  <div className="flex sm:w-108 md:gap-4 sm:gap-8 md:flex-row">
                    <div className="m-4 flex-col">
                      <div className="pt-6 pl-1 mb-9 uppercase text-sm font-semibold">
                        {donation.name}
                      </div>
                      <div className="p-1 lg:pb-4 uppercase text-sm font-semibold">
                        {donation.breed}
                      </div>
                      <div className="pb-2 uppercase text-sm font-semibold">
                        {donation.gender}
                      </div>
                      <div className="pb-2 uppercase text-sm font-semibold">
                        {donation.petType}
                      </div>
                      <div className="pb-2 uppercase text-sm font-semibold">
                        {donation.city}, {donation.state}
                      </div>
                    </div>
                    <div className="flex sm:flex-col sm:gap-10 md:gap-2 mr-5 mt-4 sm:flex-row md:flex-col gap-2">
                      <div className="uppercase text-xs font-semibold mr-2 md:text-center">
                        <ProtectedButton label="Contact" number={donation.number} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-button carousel-button-right"
          onClick={handleNextSlide}
        >
          &gt;
        </button>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12 mb-8 mt-8">
      {displayedDonations.map((donation) => (
        <div
          key={donation._id}
          className="my-3 flex-col justify-between rounded-xl overflow-hidden"
        >
          <div className="md:flex rounded-xl shadow-2xl bg-cardColor">
            <div className="md:shrink-0 w-full md:w-auto">
              <img
                className="h-48 md:h-80 w-full object-cover rounded-xl md:w-60 lg:w-80"
                src={`${import.meta.env.VITE_API_URL}${donation.petImage}`}
                alt="Pet Image"
              />
            </div>
            <div className="flex-col">
              <div className="flex sm:w-108 md:gap-4 sm:gap-8 md:flex-row">
                <div className="m-4 flex-col">
                  <div className="pt-6 pl-1 mb-9 uppercase text-sm font-semibold">
                    {donation.name}
                  </div>
                  <div className="p-1 lg:pb-4 uppercase text-sm font-semibold">
                    {donation.breed}
                  </div>
                  <div className="pb-2 uppercase text-sm font-semibold">
                    {donation.gender}
                  </div>
                  <div className="pb-2 uppercase text-sm font-semibold">
                    {donation.petType}
                  </div>
                  <div className="pb-2 uppercase text-sm font-semibold">
                    {donation.city}, {donation.state}
                  </div>
                </div>
                <div className="flex sm:flex-col sm:gap-10 md:gap-2 mr-5 mt-4 sm:flex-row md:flex-col gap-2">
                  <div className="uppercase text-xs font-semibold mr-2 md:text-center">
                    <ProtectedButton label="Contact" number={donation.number} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
