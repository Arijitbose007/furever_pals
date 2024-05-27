import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import imgSrc from "../assets/Images/cats-dogs.jpg";

const Adopt = () => {
  const customStyle = true;
  const showAboutUs = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    number: '',
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  const handlePhoneNumberInput = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9\+\.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5555/adopt`, formData);
      console.log("Adoption submitted successfully:", response.data);
      toast.success("Adoption submitted successfully!");
      setFormData({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        number: '',
      });
    } catch (error) {
      console.error("Error submitting adoption:", error);
      toast.error("Error submitting adoption. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Navbar
        showAboutUs={showAboutUs}
        customStyle={customStyle}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isSupportMenuOpen={isSupportMenuOpen}
        toggleSupportMenu={toggleSupportMenu}
      />
      <section className="mt-2">
        <div className="px-5 py-24 mx-auto ">
          <div className="flex flex-col  text-center w-full mb-12">
            <h1 className="text-2xl lg:text-5xl text-bold font-medium mb-4">
              Adopt Your Favourite Pet !
            </h1>
          </div>
          <img src={imgSrc} alt="Form" className="form-image" />
          <form onSubmit={handleSubmit} className="relative p-8 rounded-lg">
            <div className="lg:w-2/3 mx-auto">
              <div className="flex m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="fullName" className="leading-7 text-sm text-gray-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.fullName}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="youremail@gmail.com"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-900">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Your Address"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.address}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="city" className="leading-7 text-sm text-gray-900">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Agra"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.city}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="state" className="leading-7 text-sm text-gray-900">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Uttar Pradesh"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.state}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="pincode" className="leading-7 text-sm text-gray-900">
                      Pincode
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      name="pincode"
                      placeholder="700124"
                      min="0"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.pincode}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="number" className="leading-7 text-sm text-gray-900">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      placeholder="+91 0123456789"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.number}
                      onInput={handlePhoneNumberInput}
                      required
                    />
                  </div>
                </div>
                
                <div className="p-4 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer isLogoVisible={true} />
      <BackToTop />
      <ToastContainer />
    </>
  );
};

export default Adopt;
