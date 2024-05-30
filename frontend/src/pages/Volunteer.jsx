import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/Components.css";
import BackToTop from "../components/Backtotop";
import imgSrc from "../assets/Images/cats-dogs.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Volunteer = () => {
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
    age: '',
    number: '',
    gender: '',
    volunteerImage: null,
  });

  const initialFormData = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    age: '',
    number: '',
    gender: '',
    volunteerImage: null,
  };

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
    console.log(formData);
    if (!formData.volunteerImage) {
      toast.error("Please upload a volunteer image.");
      return;
    }
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      console.log(formDataToSend);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/volunteer`, formDataToSend);
      console.log("Volunteer submitted successfully:", response.data);
      toast.success("Volunteer submitted successfully!");
      // Reset form data
      setFormData(initialFormData);
      cancelPreview();
    } catch (error) {
      console.error("Error submitting volunteer:", error);
      toast.error("Error submitting volunteer.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "volunteerImage" && files && files[0]) {
      const imageFile = files[0];
      setFormData({ ...formData, volunteerImage: imageFile });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (formData.volunteerImage) {
      previewImage(formData.volunteerImage);
    }
  }, [formData.volunteerImage]);

  const previewImage = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const previewContainer = document.getElementById("imagePreview");
      const inputLabel = document.getElementById("imageInputLabel");

      const previewImage = document.createElement("img");
      previewImage.classList.add("w-full", "h-80");
      previewImage.src = e.target.result;

      inputLabel.style.display = "none";
      previewContainer.innerHTML = "";
      previewContainer.appendChild(previewImage);

      const cancelButton = document.createElement("button");
      cancelButton.className =
        "mt-2 bg-red-600 text-white px-2 py-1 rounded justify-center items-center";
      cancelButton.textContent = "Cancel";
      cancelButton.onclick = cancelPreview;
      previewContainer.appendChild(cancelButton);
    };

    reader.readAsDataURL(file);
  };

  const cancelPreview = () => {
    const input = document.getElementById("imageInput");
    const previewContainer = document.getElementById("imagePreview");
    const inputLabel = document.getElementById("imageInputLabel");

    inputLabel.style.display = "";
    previewContainer.innerHTML = "";
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
        <div className="px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium  mb-4 ">
              Volunteers
            </h1>
            <p className="sm:text-3xl text-2xl font-medium mb-4">
              Fill up the form below :)
            </p>
          </div>
          <img src={imgSrc} alt="Form" className="form-image" />
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="lg:w-2/3 mx-auto">
              <div className="flex m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="fullName"
                      className="leading-7 text-sm text-gray-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.fullName}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="youremail@gmail.com"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="leading-7 text-sm text-gray-900"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Your Address"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.address}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="city"
                      className="leading-7 text-sm text-gray-900"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Agra"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.city}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="state"
                      className="leading-7 text-sm text-gray-900"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Uttar Pradesh"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.state}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2 ">
                  <div className="relative ">
                    <label
                      htmlFor="gender"
                      className="leading-7 text-sm text-gray-900"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      placeholder="Select Gender"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 outline-none py-2"
                      onChange={handleChange}
                      value={formData.gender}
                    >
                      <option className="bg-gray-100" value="">
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="number"
                      className="leading-7 text-sm text-gray-900"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      placeholder="+91 0123456789"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.number}
                      onInput={handlePhoneNumberInput}
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="age"
                      className="leading-7 text-sm text-gray-900"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      placeholder="2"
                      min="0"
                      max="100"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2  outline-none py-1 px-3 leading-8"
                      onChange={handleChange}
                      value={formData.age}
                      required
                    />
                  </div>
                </div>

                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="image"
                      className="leading-7 text-sm text-gray-900"
                    >
                      Volunteer Image
                    </label>
                    <div className="max-w-5xl">
                      <input
                        type="file"
                        name="volunteerImage"
                        id="imageInput"
                        className="hidden"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="imageInput"
                        id="imageInputLabel"
                        className="flex justify-center items-center h-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400"
                      >
                        <span className="font-medium flex justify-center items-center text-blue-600 underline">
                          Browse file to Attach
                        </span>
                      </label>
                    </div>
                    <div id="imagePreview" className="mt-4"></div>
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

export default Volunteer;
