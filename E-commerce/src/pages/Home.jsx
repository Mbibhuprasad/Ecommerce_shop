import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones } from "react-icons/fi";

const Home = () => {
  const features = [
    {
      icon: <FiShoppingBag className="text-4xl text-primary" />,
      title: "Quality Products",
      description: "We ensure the highest quality products for our customers",
    },
    {
      icon: <FiTruck className="text-4xl text-primary" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <FiShield className="text-4xl text-primary" />,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: <FiHeadphones className="text-4xl text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500",
    },
    {
      name: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500",
    },
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-400 text-white py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Welcome to ShopEase</h1>
              <p className="text-xl mb-8">
                Discover amazing products at unbeatable prices. Shop now and
                experience the best online shopping!
              </p>
              <Link
                to="/products"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Shop Now
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1607083206865-6c7a1a19c5d6?w=500"
                alt="Shopping"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link to="/products" key={index} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
