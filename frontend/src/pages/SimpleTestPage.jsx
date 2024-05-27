import React, { useState } from "react";
import Navbar from "../components/DashNavbar";
import Footer from "../components/Footer";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import axios from "axios"; // Import Axios

const Shelter = () => {
  const customStyle = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
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
      <div className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full bg-cover bg-no-repeat md:h-full md:w-64"
              src="src/assets/Images/husky.jpg"
              alt="Pet Image"
            ></img>
          </div>
          <div className="flex">
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full bg-cover bg-no-repeat md:h-full md:w-64"
              src="src/assets/Images/husky.jpg"
              alt="Pet Image"
            ></img>
          </div>
          <div className="flex">
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full bg-cover bg-no-repeat md:h-full md:w-64"
              src="src/assets/Images/husky.jpg"
              alt="Pet Image"
            ></img>
          </div>
          <div className="flex">
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full bg-cover bg-no-repeat md:h-full md:w-64"
              src="src/assets/Images/husky.jpg"
              alt="Pet Image"
            ></img>
          </div>
          <div className="flex">
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full bg-cover bg-no-repeat md:h-full md:w-64"
              src="src/assets/Images/husky.jpg"
              alt="Pet Image"
            ></img>
          </div>
          <div className="flex">
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="mt-3 mb-3 max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full bg-cover bg-no-repeat md:h-full md:w-64"
              src="src/assets/Images/husky.jpg"
              alt="Pet Image"
            ></img>
          </div>
          <div className="flex">
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
            <div className="p-8 flex-col">
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
              <div className="p-1 uppercase text-sm  font-semibold">
                Company retreats
              </div>
            </div>
          </div>
          
        </div>
      </div>
      </div>
     
      <Footer />
      <BackToTop />
    </>
  );
};

export default Shelter;
