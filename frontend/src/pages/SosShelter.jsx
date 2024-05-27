import React, { useState, useEffect } from "react";
import Navbar from "../components/DashNavbar";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import axios from "axios";

const SosShelter = () => {
  const customStyle = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [soses, setSoses] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const isFixed = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  useEffect(() => {
    const fetchSoses = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/sos`);
        setSoses(response.data.data);
      } catch (error) {
        console.error("Error fetching soses:", error);
      }
    };

    fetchSoses();
  }, []);

  const handleDelete = async (id) => {
    try {
      setSoses(soses.filter((sos) => sos._id !== id));
      await axios.delete(`http://localhost:5555/sos/${id}`);
    } catch (error) {
      console.error("Error deleting sos:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const updatedSoses = soses.map((sos) => {
        if (sos._id === id) {
          return { ...sos, status: "Approved" };
        }
        return sos;
      });
      setSoses(updatedSoses);

      await axios.patch(`http://localhost:5555/sos/${id}/approve`, {
        status: "Approved",
      });
    } catch (error) {
      console.error("Error approving sos:", error);
    }
  };

  const handleConditionFilter = (condition) => {
    setSelectedCondition(condition);
  };

  const filteredSoses = selectedCondition
    ? soses.filter((sos) => sos.condition === selectedCondition)
    : soses;

  const conditions = ["Extremely Critical", "Critical", "Moderate Health"];

  return (
    <>
      <Navbar
        customStyle={customStyle}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isSupportMenuOpen={isSupportMenuOpen}
        toggleSupportMenu={toggleSupportMenu}
      />
      <div className="flex justify-center p-4">
        <div className="flex flex-wrap justify-center items-center">
          {conditions.map((condition) => (
            <button
              key={condition}
              onClick={() => handleConditionFilter(condition)}
              className={`m-2 p-2 rounded-lg border ${
                selectedCondition === condition ? "bg-customPurple text-white" : "text-black"
              }`}
            >
              {condition}
            </button>
          ))}
          <button
            onClick={() => handleConditionFilter("")}
            className={`m-2 p-2 rounded-lg border ${
              selectedCondition === "" ? "bg-customPurple text-white" : "text-black"
            }`}
          >
            All
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredSoses.map((sos) => (
          <div
            key={sos._id}
            className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl"
          >
            <div className="md:flex">
              <div className="md:shrink-0">
                <img
                  className="h-80 w-full bg-cover bg-no-repeat md:w-64"
                  src={`http://localhost:5555${sos.sosImage}`}
                  alt="Sos Image"
                />
              </div>
              <div className="flex sm:justify-center sm:items-center">
                <div className="m-4 flex-col truncate overflow-hidden">
                  <div className="pt-2 pl-1 mb-4 flex uppercase text-sm font-semibold">
                    {sos.fullName}
                  </div>
                  <div className="p-1 uppercase mb-4 text-sm font-semibold">
                    {sos.number}
                  </div>
                  <div className="p-1 uppercase text-sm font-semibold">
                    {sos.city}
                  </div>
                </div>
                <div className="m-4 flex-col truncate overflow-hidden">
                  <div className="pt-2 pl-1 mb-4 flex uppercase text-sm font-semibold">
                    {sos.animalType}
                  </div>
                  <div className="p-1 mb-4 uppercase text-sm font-semibold">
                    {sos.condition}
                  </div>
                  <div className="p-1 uppercase text-sm font-semibold">
                    {sos.state}
                  </div>
                </div>
                <div className="flex-col mx-24 lg:mx-16">
                  <div className="mb-6 ml-4 flex text-sm font-semibold break-normal whitespace-normal">
                    {sos.emergencyAddr}
                  </div>
                  <div className="ml-4 flex text-sm font-semibold break-normal whitespace-normal">
                    {sos.additionalInfo}
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="m-2 mt-12 mb-4 flex justify-center items-center bg-green text-white py-2 px-4 rounded-md mr-2"
                    onClick={() => handleApprove(sos._id)}
                  >
                    {sos.status === "Approved" ? "Approved" : "Approve"}
                  </button>
                  <button
                    className="m-2 mt-12 mb-4 flex justify-center items-center bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                    onClick={() => handleDelete(sos._id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BackToTop />
    </>
  );
};

export default SosShelter;
