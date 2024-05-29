import React, { useState, useEffect } from 'react';
import './Components.css'; // Import any necessary CSS for styling
import topSrc from "../assets/Images/uparrow.png";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`back-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
      <img src={topSrc} alt="Back to Top" />
    </div>
  );
};

export default BackToTop;
