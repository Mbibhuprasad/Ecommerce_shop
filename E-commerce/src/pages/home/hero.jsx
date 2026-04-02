// Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-50">
      {/* Animated Background Glossy Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Glossy Card Effect */}
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/40 inline-block">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">
            Welcome to Our Store
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-blue-900/80 max-w-2xl">
            Discover elegance and innovation. Experience shopping like never
            before with our premium collection.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Shop Now
            </button>
            <button className="px-8 py-3 bg-white/40 backdrop-blur-sm text-blue-900 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/60">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20 md:h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="white"
            opacity="0.8"
          ></path>
          <path
            d="M0,0V15.81C13,21.25,27.93,25.67,44.24,28.45c69.76,13.23,140.79,7.08,210.07-6.47,79.72-15.56,156.91-37.91,237.67-40.49C554.79,4.2,632.75,22.54,710.2,39.22c77.2,16.6,153.81,23.55,231.38,15.92,43.57-4.28,85.31-14.32,126.42-25.79V0Z"
            fill="white"
            opacity="0.5"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
