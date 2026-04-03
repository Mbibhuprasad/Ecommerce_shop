// src/pages/Home.jsx
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import HeroSection from "./home/hero";
import Features from "./home/Features";
import AboutSection from "./home/AboutSection";
import HowItWorks from "./home/HowItWorks";
import TopDeals from "./home/TopDeals";
import Testimonials from "./home/Testimonials";
import Newsletter from "./home/Newsletter";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <Features />
      <AboutSection />
      <HowItWorks />
      <TopDeals />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
