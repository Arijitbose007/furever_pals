import React, { forwardRef } from "react";
import "./Components.css";

const ContactUs = forwardRef((props, ref) => {
  return (
    <>
      <section className="pt-20 pb-20 bg-customPurple">
      <div className="w-full mx-auto max-w-screen-md">
        <form
          action="https://formspree.io/f/xoqojeyp"
          method="POST"
          className=" rounded-md text-white bg-purple  px-8 pt-6 pb-8"
        >
          <p id="contact"></p>
          <h2 className="text-3xl mt-1 mb-2 text-center font-bold">
            CONTACT US
          </h2>
          <p className="font-bold text-center">
            Any issues! Fill the form below and our team will contact you shortly.
          </p>
          <br />
          <div className="mb-4">
            <label className=" text-white text-sm font-bold mb-2" htmlFor="contact_nom">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="contact_nom"
              name="contact_nom"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="contact_email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="contact_email"
              name="contact_email"
              type="email"
              required
              placeholder="hello@petme"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contact_message" className="block text-white text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="contact_message"
              name="contact_message"
              required
              rows="6"
              placeholder="Your message"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              className="text-white py-5 px-5 bg-splBlack font-bold rounded-full" id ="logo"
              type="submit"
            >
              Contact Us
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
});

export default ContactUs;