import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <FiMapPin className="text-2xl text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600">
                  123 Business Street
                  <br />
                  City, State 12345
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FiPhone className="text-2xl text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">(555) 123-4567</p>
                <p className="text-gray-600">Mon-Fri, 9am-6pm EST</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FiMail className="text-2xl text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">info@shopease.com</p>
                <p className="text-gray-600">support@shopease.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2"
            >
              <FiSend />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
