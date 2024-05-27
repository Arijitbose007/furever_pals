import React, { useState } from "react";
import "../components/Components.css";

const Emergency = ({ isVisible, isMenuOpen }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const goToPage = () => {
    const link = `https://www.justdial.com/${inputValue}/Pet-Clinics/nct-10616595`;
    window.location.href = link;
  };

  return (
    <>
      {isVisible && !isMenuOpen && (
        <button className="help_btn sm:mx-10 z-10" onClick={openPopup}>Emergency</button>
      )}
      {isPopupOpen && (
        <dialog className="popup z-10" open>
          <div className="Head">
            <h1 className="Head_text">Get Help</h1>
            <button id="close" aria-label="close" onClick={closePopup}>X</button>
          </div>
          <h2 className="subHead">Search a city name and find pet care centers there</h2>
          <input
            placeholder="Get info of Pet Clinics"
            type="text"
            id="input"
            name="input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                goToPage();
              }
            }}
          />
          <button id="GoButton" onClick={goToPage}>Go</button>
        </dialog>
      )}
    </>
  );
};

export default Emergency;
