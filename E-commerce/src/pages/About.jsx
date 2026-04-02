import React from "react";

const About = () => {
  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500",
      bio: "10+ years of experience in e-commerce",
    },
    {
      name: "Jane Smith",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
      bio: "Expert in supply chain management",
    },
    {
      name: "Mike Johnson",
      role: "Customer Success",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
      bio: "Dedicated to customer satisfaction",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">About ShopEase</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to provide the best online shopping experience
            with quality products and exceptional service.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, ShopEase started as a small online store with a
                big dream. Today, we've grown into a trusted e-commerce platform
                serving thousands of customers worldwide.
              </p>
              <p className="text-gray-600">
                Our commitment to quality, competitive prices, and customer
                satisfaction has made us a preferred choice for online shoppers.
                We carefully curate our products and work with trusted suppliers
                to ensure you get the best value for your money.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500"
                alt="Our team"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
