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
      const matchesFilters = filters.every((filter) => {
        if (filter === "Location") {
          return (
            item.city?.toLowerCase().includes(searchLower) ||
            item.state?.toLowerCase().includes(searchLower)
          );
        }
        if (filter === "Pet Type") {
          return item.petType?.toLowerCase().includes(searchLower);
        }
        if (filter === "Gender") {
          return item.gender?.toLowerCase().includes(searchLower);
        }
        if (filter === "Breed") {
          return item.breed?.toLowerCase().includes(searchLower);
        }
        return true;
      });
      return matchesFilters;
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
                        {donation.gender}
                      </div>
                      <div className="p-1 lg:pb-4 uppercase text-sm font-semibold">
                        {donation.color}
                      </div>
                      <div className="p-1 lg:pb-4 uppercase text-sm font-semibold">
                        {donation.city}
                      </div>
                    </div>
                    <div className="m-4 relative flex-col">
                      <div className="pt-6 mb-9 flex items-center justify-center uppercase text-sm font-semibold">
                        <br />
                      </div>
                      <div className="p-1 lg:pb-4 uppercase text-sm font-semibold">
                        {donation.breed}
                      </div>
                      <div className="p-1 lg:pb-4 uppercase text-sm font-semibold">
                        {donation.age} yr
                      </div>
                      <div className="p-1 lg:pb-4 uppercase text-sm font-semibold">
                        {donation.state}
                      </div>
                    </div>
                  </div>
                  <div className="m-3 flex flex-col items-center justify-center">
                    <ProtectedButton redirectTo="/adopt">
                      Adopt me
                    </ProtectedButton>
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

  // Default non-carousel behavior
  return (
    <div className="flex flex-wrap justify-center">
      {displayedDonations.map((donation) => (
        <div
          key={donation._id}
          className="mt-3 mb-3 w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl"
        >
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-80 w-full object-cover md:w-64"
                src={`${import.meta.env.VITE_API_URL}${donation.petImage}`}
                alt="Pet Image"
              />
            </div>
            <div className="flex flex-col justify-between p-4 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="m-2 flex-col truncate overflow-hidden">
                  <div className="pt-2 pl-1 mb-2 uppercase text-sm font-semibold">
                    {donation.fullName}
                  </div>
                  <div className="p-1 uppercase mb-2 text-sm font-semibold">
                    {donation.number}
                  </div>
                  <div className="p-1 uppercase mb-2 text-sm font-semibold">
                    {donation.city}
                  </div>
                  <div className="p-1 uppercase text-sm font-semibold">
                    {donation.age} yr old
                  </div>
                </div>
                <div className="m-2 flex-col truncate overflow-hidden">
                  <div className="pt-2 pl-1 mb-2 uppercase text-sm font-semibold">
                    {donation.gender}
                  </div>
                  <div className="p-1 mb-2 uppercase text-sm font-semibold">
                    {donation.breed}
                  </div>
                  <div className="p-1 uppercase mb-2 text-sm font-semibold">
                    {donation.state}
                  </div>
                  <div className="p-1 uppercase text-sm font-semibold">
                    {donation.color}
                  </div>
                </div>
              </div>
              <div className="ml-2 w-full">
                <div className="pt-2 pl-1 mb-2 uppercase text-sm font-semibold break-words">
                  {donation.email}
                </div>
                <div className="p-1 uppercase text-sm font-semibold break-words">
                  {donation.address}
                </div>
              </div>
              <div className="flex justify-center mt-4 w-full">
                <ProtectedButton redirectTo="/adopt">
                  Adopt me
                </ProtectedButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
