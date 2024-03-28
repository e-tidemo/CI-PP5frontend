/* This form was collected from https://www.geeksforgeeks.org/build-a-contact-form-using-django-react-and-tailwind/ */

import React, { useState } from "react";
import axios from "axios";
 
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "", 
    email: "",
    message: "",
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await axios.post(
        "/api/submit_contact_form/",
        formData
      );
      alert("Form Submitted");
      setFormData({ name: "", subject: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-400">
      <div className="bg-white p-4 rounded shadow-md max-w-sm w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-green-900 ">
            CONTACT US
          </h1>
        </div>
 
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
 
          <div className="mb-2">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div> 
          <div className="mb-2">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
 
          <div className="mb-2">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
 
          <button
            type="submit"
            className="bg-green-400 text-white p-2 rounded-2xl"
            style={{ width: "355px" }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default ContactForm;