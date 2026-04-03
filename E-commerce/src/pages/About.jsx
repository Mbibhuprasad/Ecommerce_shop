import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiUsers,
  FiTruck,
  FiShield,
  FiAward,
  FiHeart,
  FiGlobe,
  FiStar,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const About = () => {
  const stats = [
    {
      number: "10K+",
      label: "Happy Customers",
      icon: FiUsers,
      color: "bg-blue-500",
    },
    {
      number: "500+",
      label: "Trusted Vendors",
      icon: FiTruck,
      color: "bg-green-500",
    },
    {
      number: "100%",
      label: "Secure Shopping",
      icon: FiShield,
      color: "bg-purple-500",
    },
    {
      number: "24/7",
      label: "Customer Support",
      icon: FiAward,
      color: "bg-orange-500",
    },
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above all else.",
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      icon: FiShield,
      title: "Trust & Transparency",
      description:
        "We believe in honest communication and transparent operations.",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: FiStar,
      title: "Quality Assurance",
      description: "We ensure all products meet our high quality standards.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      icon: FiTrendingUp,
      title: "Innovation",
      description:
        "Constantly evolving to provide the best shopping experience.",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      icon: FiGlobe,
      title: "Global Reach",
      description: "Connecting customers and vendors from around the world.",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: FiClock,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep.",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Visionary leader with 15+ years in e-commerce",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      bio: "Ensuring smooth operations and customer satisfaction",
    },
    {
      name: "Michael Chen",
      role: "Tech Director",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      bio: "Leading innovation and technology solutions",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const statsVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About <span className="text-yellow-300">Shoplyonix</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Your trusted shopping destination connecting customers with
              quality products from verified vendors
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Story & Mission Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <FiHeart className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2024, Shoplyonix started with a simple mission: to
              provide a seamless shopping experience for customers while
              empowering vendors to grow their business online.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a small marketplace has grown into a trusted
              platform connecting thousands of customers with quality products
              from verified vendors across the globe.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <FiGlobe className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To create a transparent, secure, and user-friendly marketplace
              where customers can discover amazing products and vendors can
              thrive.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're committed to innovation, quality, and customer satisfaction
              in everything we do.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 mb-20 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <div
                    className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-4xl font-bold mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`${value.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`${value.color} w-8 h-8`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate team behind Shoplyonix
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of happy customers who trust Shoplyonix
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/products")}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
