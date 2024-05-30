import React, { useState, useEffect, useRef , useNavigate } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import Catalog from "../components/Catalog";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import BackToTop from "../components/Backtotop";
import videoSrc from "../assets/Images/pexels-c-technical-6568959-2-1.mp4"; // Import the video file
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Emergency from "../components/Emergency";
import Buddies from "./Buddies";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [customStyle, setCustomStyle] = useState(false); // Define customStyle here or set it based on some condition
  const [approvedDonations, setApprovedDonations] = useState([]); // State to store approved donations
  const [showHelpButton, setShowHelpButton] = useState(true); // State to manage visibility of the Help button
  const aboutUsRef = useRef(null); // Create a ref for the AboutUs section
  const contactUsRef = useRef(null); // Create a ref for the ContactUs section
  const showAboutUs = true;

  const toggleCustomStyle = () => {
    setCustomStyle(!customStyle); // Toggle customStyle state
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  useEffect(() => {
    const fetchApprovedDonations = async () => {
      try {
        // Fetch all donations
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/donate`);
        const allDonations = response.data.data;

        // Filter out approved donations
        const approved = allDonations.filter((donation) => donation.status === 'Approved');
        setApprovedDonations(approved);
      } catch (error) {
        console.error("Error fetching approved donations:", error);
      }
    };

    fetchApprovedDonations();
  }, []); // Empty dependency array to fetch approved donations only once when the component mounts

  const scrollToAboutUs = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContactUs = () => {
    if (contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll event to toggle Help button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowHelpButton(false);
      } else {
        setShowHelpButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section className="relative">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={videoSrc} // Use the imported video source
        >
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <Navbar
            showAboutUs={showAboutUs}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isSupportMenuOpen={isSupportMenuOpen}
            toggleSupportMenu={toggleSupportMenu}
            customStyle={customStyle} // Pass customStyle as a prop
            scrollToAboutUs={scrollToAboutUs} // Pass the scrollToAboutUs function as a prop
          />
          <section className={`${isMenuOpen ? "hidden" : ""} pt-16`}>
            <div className="main-body-section-div text-white">
              <div className="heading-main-body">
                <div className="main-body-heading-text">
                  <h1>Adopt Me</h1>
                  <div>Give life to an animal in need.</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section ref={aboutUsRef}>
        <AboutUs />
      </section>
      <div className="heading">
        <h1 className="meet-heading text-4xl bg-customPurple text-white">
          Meet our Buddies
        </h1>
      </div>
      <Catalog isCarousel={true} />
      <div className="flex justify-center p-4">
      <Link
        to="/buddies"
        className="p-3 text-white bg-customPurple font-bold glow-effect hover:text-white rounded-lg transition duration-300 ease-in-out transform flex items-center justify-center"
      >
        Find a companion who loves unconditionally.
      </Link>
    </div>

      <section ref={contactUsRef}>
        <ContactUs />
      </section>
      <Footer isLogoVisible={true} />
      <Emergency isVisible={showHelpButton} isMenuOpen={isMenuOpen} />
      <BackToTop />
    </>
  );0
};

export default Home;
