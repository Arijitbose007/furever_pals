import React, { useState, useEffect } from "react";
import Navbar from "../components/DashNavbar";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import axios from "axios";


const Shelter = () => {
  const customStyle = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [adoptions, setAdoptions] = useState([]);
  const isFixed = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/adopt`);
        setAdoptions(response.data.data);
      } catch (error) {
        console.error("Error fetching adoptions:", error);
      }
    };

    fetchAdoptions();
  }, []);

  const handleDelete = async (id) => {
    try {
      setAdoptions(adoptions.filter((adoption) => adoption._id !== id));
      await axios.delete(`${import.meta.env.VITE_API_URL}/adopt/${id}`);
    } catch (error) {
      console.error("Error deleting adoption:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const updatedAdoptions = adoptions.map((adoption) => {
        if (adoption._id === id) {
          return { ...adoption, status: "Approved" };
        }
        return adoption;
      });
      setAdoptions(updatedAdoptions);

      await axios.patch(`${import.meta.env.VITE_API_URL}/adopt/${id}/approve`, {
        status: "Approved",
      });
    } catch (error) {
      console.error("Error approving adoption:", error);
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
      <div className="flex flex-wrap justify-center">
        {adoptions.map((adoption) => (
          <div
            key={adoption._id}
            className="m-4 max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <div className="flex ml-4 flex-col space-y-2">
                <div className="text-sm font-semibold uppercase truncate">
                  {adoption.fullName}
                </div>
                <div className="text-sm font-semibold truncate">
                  {adoption.email}
                </div>
                <div className="text-sm font-semibold uppercase">
                  {adoption.city} - {adoption.pincode}
                </div>
                <div className="text-sm font-semibold">
                  {adoption.number}
                </div>
                <div className="text-sm font-semibold uppercase">
                  {adoption.state}
                </div>
              </div>
              <div className="mt-4 flex ">
                <button
                  className={`w-80 mx-4 py-2 mb-2 rounded-md text-white font-semibold ${
                    adoption.status === "Approved"
                      ? "bg-green"
                      : "bg-green"
                  }`}
                  onClick={() => handleApprove(adoption._id)}
                >
                  {adoption.status === "Approved" ? "Approved" : "Approve"}
                </button>
                <button
                  className="w-80 mx-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
                  onClick={() => handleDelete(adoption._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <BackToTop />
    </>
  );
};

export default Shelter;
