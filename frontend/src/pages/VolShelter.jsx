import React, { useState, useEffect } from "react";
import Navbar from "../components/DashNavbar";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import axios from "axios";


const VolShelter = () => {
  const customStyle = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const isFixed = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/volunteer`);
        setVolunteers(response.data.data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  const handleDelete = async (id) => {
    try {
      setVolunteers(volunteers.filter((volunteer) => volunteer._id !== id));
      await axios.delete(`${import.meta.env.VITE_API_URL}/volunteer/${id}`);
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const updatedVolunteers = volunteers.map((volunteer) => {
        if (volunteer._id === id) {
          return { ...volunteer, status: "Approved" };
        }
        return volunteer;
      });
      setVolunteers(updatedVolunteers);

      await axios.patch(`${import.meta.env.VITE_API_URL}/volunteer/${id}/approve`, {
        status: "Approved",
      });
    } catch (error) {
      console.error("Error approving volunteer:", error);
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
        {volunteers.map((volunteer) => (
          <div
            key={volunteer._id}
            className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl"
          >
            <div className="md:flex">
              <div className="md:shrink-0">
                <img
                  className="h-80 w-full bg-cover bg-no-repeat md:w-64"
                  src={`${import.meta.env.VITE_API_URL}${volunteer.volunteerImage}`}
                  alt="Volunteer Image"
                />
              </div>

              <div className="flex">
             
                <div className="m-4 flex-col truncate overflow-hidden">
                  <div className="pt-2 pl-1 mb-4 flex uppercase text-sm font-semibold">
                    {volunteer.fullName}
                  </div>
                  <div className="pt-2 pl-1 mb-6  flex text-sm font-semibold">
                    {volunteer.email}
                  </div>
                  <div className="p-1 uppercase mb-4 text-sm font-semibold">
                    {volunteer.age} yr
                  </div>
                  <div className="p-1 uppercase text-sm font-semibold">
                    {volunteer.city}
                  </div>
                </div>
                <div className="m-4 flex-col truncate overflow-hidden">
                <div className="pt-2 pl-1 mb-4 flex uppercase text-sm font-semibold">
                    {volunteer.gender}
                  </div>
                  <div className="pt-4 mb-4  flex items-center justify-center uppercase text-sm font-semibold">
                    <br />
                  </div>
                  <div className="p-1 mb-4 uppercase text-sm font-semibold">
                    {volunteer.number}
                  </div>
                  <div className="p-1 uppercase text-sm font-semibold">
                    {volunteer.state}
                  </div>
                </div>
                <div className="m-4 flex">
                  <button
                    className="m-2 mt-12 mb-4 flex justify-center items-center bg-green text-white py-2 px-4 rounded-md mr-2"
                    onClick={() => handleApprove(volunteer._id)}
                  >
                    {volunteer.status === "Approved" ? "Approved" : "Approve"}
                  </button>
                  <button
                    className="m-2 mt-12 mb-4 flex justify-center items-center bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                    onClick={() => handleDelete(volunteer._id)}
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

export default VolShelter;
