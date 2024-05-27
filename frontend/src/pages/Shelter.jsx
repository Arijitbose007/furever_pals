import React, { useState, useEffect } from "react";
import Navbar from "../components/DashNavbar";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import axios from "axios";
import Catalog from "../components/Catalog";

const Shelter = () => {
  const customStyle = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [donations, setDonations] = useState([]);
  const isFixed = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/donate`);
        setDonations(response.data.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const handleDelete = async (id) => {
    try {
      setDonations(donations.filter((donation) => donation._id !== id));
      await axios.delete(`http://localhost:5555/donate/${id}`);
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const updatedDonations = donations.map((donation) => {
        if (donation._id === id) {
          return { ...donation, status: "Approved" };
        }
        return donation;
      });
      setDonations(updatedDonations);

      await axios.patch(`http://localhost:5555/donate/${id}/approve`, {
        status: "Approved",
      });
    } catch (error) {
      console.error("Error approving donation:", error);
    }
  };

  return (
    <>
      <Navbar
        customStyle={customStyle}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isSupportMenuOpen={isSupportMenuOpen}
        toggleSupportMenu={toggleSupportMenu}
      />
     <div className="flex flex-wrap">
  {donations.map((donation) => (
    <div
      key={donation._id}
      className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl"
    >
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-80 w-full bg-cover bg-no-repeat md:w-64"
            src={`http://localhost:5555${donation.petImage}`}
            alt="Sos Image"
          />
        </div>

        <div className="flex sm:justify-center sm:items-center">
          <div className="m-4 flex-col truncate overflow-hidden">
            <div className="pt-2 pl-1 mb-4 flex uppercase text-sm font-semibold">
              {donation.fullName}
            </div>
            <div className="p-1 uppercase mb-4 text-sm font-semibold">
              {donation.number} 
            </div>
            <div className="p-1 uppercase mb-4 text-sm font-semibold">
              {donation.city}
            </div>
            
            <div className="p-1 uppercase text-sm font-semibold">
              {donation.age} yr old
            </div>
          </div>
          <div className="m-4 flex-col truncate overflow-hidden">
            <div className="pt-2 pl-1 mb-4 flex uppercase text-sm font-semibold">
              {donation.gender}
            </div>
            <div className="p-1 mb-4 uppercase text-sm font-semibold">
              {donation.breed}
            </div>
            <div className="p-1 uppercase mb-4 text-sm font-semibold">
              {donation.state}
            </div>
            <div className="p-1 uppercase text-sm font-semibold">
              {donation.color}
            </div>
          </div>
          <div className="flex-col mx-24 lg:mx-16">
            <div className="mb-6 ml-4 flex text-sm font-semibold break-normal whitespace-normal">
              {donation.email}
            </div>
            <div className="ml-4  flex text-sm font-semibold break-normal whitespace-normal">
              {donation.address}
            </div>
          </div>
          
          <div className="flex">
            <button
              className="m-2 mt-12 mb-4 flex justify-center items-center bg-green text-white py-2 px-4 rounded-md mr-2"
              onClick={() => handleApprove(donation._id)}
            >
              {donation.status === "Approved" ? "Approved" : "Approve"}
            </button>
            <button
              className="m-2 mt-12 mb-4 flex justify-center items-center bg-red-600 text-white py-2 px-4 rounded-md mr-2"
              onClick={() => handleDelete(donation._id)}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
     </div>
     {/* Include the Catalog component here */}
      <BackToTop />
    </>
  );
};

export default Shelter;
