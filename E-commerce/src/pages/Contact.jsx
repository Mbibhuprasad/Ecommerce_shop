import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      details: "support@shopease.com",
      subDetails: "sales@shopease.com",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subDetails: "Mon-Fri, 9am-6pm EST",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: "123 Commerce Street",
      subDetails: "New York, NY 10001, USA",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div
                className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.details}</p>
              <p className="text-gray-500 text-sm">{info.subDetails}</p>
            </div>
          );
        })}
      </div>

      {/* Contact Form & Map */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Tell us about your inquiry..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? "Sending..." : "Send Message"} <FiSend />
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Business Hours
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-3">
                <FiClock className="text-indigo-600" />
                <span className="text-gray-600">Monday - Friday</span>
              </div>
              <span className="font-medium">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-3">
                <FiClock className="text-indigo-600" />
                <span className="text-gray-600">Saturday</span>
              </div>
              <span className="font-medium">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-3">
                <FiClock className="text-indigo-600" />
                <span className="text-gray-600">Sunday</span>
              </div>
              <span className="font-medium text-red-600">Closed</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Emergency Support
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              For urgent matters outside business hours, please email:
            </p>
            <a
              href="mailto:emergency@shopease.com"
              className="text-indigo-600 hover:text-indigo-700"
            >
              emergency@shopease.com
            </a>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition"
              >
                <FiFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition"
              >
                <FiTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition"
              >
                <FiInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
