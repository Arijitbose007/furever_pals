import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import logoSrc from "../assets/Images/logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const DashNavbar = ({
  isMenuOpen,
  toggleMenu,
  isSupportMenuOpen,
  toggleSupportMenu,
  customStyle,
}) => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  return (
    <>
      <header
        className={` left-0 right-0 flex flex-col items-center justify-center lg:flex-row lg:justify-around ${
          customStyle ? "bg-customPurple" : ""
        }`}
      >
        <div
          className={`lg:flex md:flex-row md:items-center p-2 ${
            isMenuOpen ? "hidden" : "flex"
          }`}
          id="logo"
        >
          <span className="pr-2 text-white pt-2 font-bold">
            {" "}
            Saving <br /> Lives{" "}
          </span>
          <Link to="/" className="logo-border">
            <img
              className="rounded-full w-20 h-20"
              src={logoSrc}
              alt="logos"
            />
          </Link>
          <span className="pl-2 text-white pt-2 font-bold">
            {" "}
            Saving <br /> Animals{" "}
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-2 lg:hidden"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
          id="nav-button"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="mt-1 w-10 h-10"
            aria-hidden="true"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <nav className="">
          <div
            className={`w-full lg:block z-0 ${isMenuOpen ? "" : "hidden"}`}
            id="navbar"
          >
            <ul className="mt-8 lg:flex lg:space-x-3 text-center space-y-8 lg:space-y-0 lg:border-0 rounded-lg items-center mb-5">
              
            
              
              <li>
                <Link
                  to="/shelter"
                  className=" p-3 text-white font-bold hover:underline"
                >
                  Shelter Request
                </Link>
              </li>
              <li>
                <Link
                  to="/adshelter"
                  className=" p-3 text-white font-bold hover:underline"
                >
                  Adoption Request
                </Link>
              </li>
              <li>
                <Link
                  to="/volshelter"
                  className="p-3 text-white font-bold hover:underline"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  to="/sosshelter"
                  className="p-3 text-white font-bold hover:underline"
                >
                  SOS Report
                </Link>
              </li>
             

              {isAuthenticated ? (
                <li>
                  <button
                    className="inline-flex items-center bg-header-orange-light border-2 py-4 px-3 text-white font-bold rounded-full"
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <li>
                  {/* <div>
                <img src = {user.picture} alt={user.name} 
                />
                </div> */}
                  <button
                    className="inline-flex items-center bg-header-orange-light border-2 py-4 px-3 text-white font-bold rounded-full"
                    onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default DashNavbar;
