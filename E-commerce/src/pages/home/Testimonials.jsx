// src/components/home/Testimonials.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      text: "Absolutely love this platform! The quality of products is outstanding, and the delivery was super fast. Customer service is very responsive and helpful.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Reviewer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      text: "Best online shopping experience I've ever had. The deals are amazing, and the product quality exceeds expectations. Will definitely shop again!",
      date: "5 days ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Interior Designer",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
      text: "Great selection of products at competitive prices. The return policy is hassle-free, and I love the secure payment options. Highly recommended!",
      date: "1 week ago",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Business Owner",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5,
      text: "Exceptional service and quality products. The vendor communication is excellent, and shipping was faster than expected. 5 stars!",
      date: "2 weeks ago",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ShopHub
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 lg:-ml-12 bg-white rounded-full p-3 shadow-lg hover:bg-green-50 transition z-10"
          >
            <FiChevronLeft className="w-6 h-6 text-green-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 lg:-mr-12 bg-white rounded-full p-3 shadow-lg hover:bg-green-50 transition z-10"
          >
            <FiChevronRight className="w-6 h-6 text-green-600" />
          </button>

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
            >
              <div className="flex flex-col items-center text-center">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="text-6xl text-green-600 opacity-20 mb-4">"</div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
                  {testimonials[currentIndex].text}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-green-600 text-xs mt-1">
                      {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 h-2 bg-white rounded-full"
                    : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
