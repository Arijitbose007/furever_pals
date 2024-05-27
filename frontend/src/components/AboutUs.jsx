import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";

const AboutUs = () => {
  return (
    <section className="bg-splBlack">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl text-white font-extrabold text-center">
          About Us
        </h2>
        <p className="mb-8 text-center sm:text-xl text-white">
          Our mission is to provide a platform that connects animal lovers
          with pets in need of a forever home, while also providing emergency
          medical care for stray animals in distress. We strive to make a
          difference in the lives of these innocent creatures by offering
          options to{" "}
          
            <b>
            <Link to="/adopt" className="hover-underline-animation text-customPurple">
              Adopt
              </Link>
              </b>
        
          ,{" "}
          <Link to="/donate" className="hover-underline-animation text-customPurple">
            <b>Donate</b>
          </Link>{" "}
          and through our SOS feature{" "}
          <Link to="/sos" className="hover-underline-animation text-customPurple">
            <b>Report</b>
          </Link>{" "}
          stray animals in need of immediate assistance. Together, we can
          create a better world for all animals.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
