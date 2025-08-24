import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaTruck, FaClock, FaLeaf, FaSeedling, FaStar, FaHeart, FaShieldAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === 'about-section') {
      const section = document.querySelector('.about-section');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  
  const navigate = useNavigate();
  const handleScrollToAbout = () => {
    navigate('/', { state: { scrollTo: 'about-section' } });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-md">
                  Premium Indoor Plants
                </div>
                <h1 className="text-4xl lg:text-6xl font-light text-gray-900 leading-tight">
                  Transform Your
                  <span className="block font-medium text-green-700">Living Space</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Discover our curated collection of premium plants, carefully selected for modern homes and workspaces.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white font-medium rounded-sm hover:bg-green-800 transition-colors duration-200"
                >
                  Shop Collection
                  <FaArrowRight className="ml-2 text-sm" />
                </Link>
                
                <button
                  onClick={handleScrollToAbout}  
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-semibold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Plant Varieties</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">25K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">5 Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden">
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <FaLeaf className="text-6xl mx-auto mb-4 text-green-200" />
                    <p className="text-lg font-light">Featured Plant Collection</p>
                    <p className="text-sm mt-2">Professional Plant Photography</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 bg-white p-6 rounded-sm shadow-lg max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaLeaf className="text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Free Consultation</h3>
                    <p className="text-sm text-gray-600">Expert plant care advice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each category features plants selected for specific environments and care requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Indoor",
                title: "Indoor Plants",
                description: "Perfect for home and office spaces",
                image: "🌿"
              },
              {
                category: "Succulent", 
                title: "Succulents",
                description: "Low maintenance, high impact",
                image: "🌵"
              },
              {
                category: "Flowering",
                title: "Flowering Plants", 
                description: "Seasonal blooms and color",
                image: "🌸"
              },
              {
                category: "Outdoor",
                title: "Outdoor Plants",
                description: "Garden and landscape varieties",
                image: "🌳"
              }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <Link to={`/products?category=${item.category}`}>
                  <div className="aspect-square bg-gray-50 rounded-sm mb-4 overflow-hidden group-hover:bg-gray-100 transition-colors duration-200">
                    <div className="h-full flex items-center justify-center">
                      <span className="text-6xl opacity-50">{item.image}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
            >
              View All Products
              <FaArrowRight className="ml-2 text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600">Professional service and expert knowledge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaTruck,
                title: "Free Delivery",
                description: "Complimentary delivery on orders over ₹999",
              },
              {
                icon: FaLeaf,
                title: "Care Instructions",
                description: "Detailed guides for optimal plant health",
              },
              {
                icon: FaShieldAlt,
                title: "Health Guarantee",
                description: "15-day guarantee on all plants",
              },
              {
                icon: FaPhone,
                title: "Expert Support",
                description: "Professional consultation available",
              }
            ].map((service, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <service.icon className="text-2xl text-green-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-[4/3] bg-gray-100 rounded-sm">
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <FaSeedling className="text-5xl mx-auto mb-4 text-green-200" />
                    <p className="text-lg font-light">Our Story</p>
                    <p className="text-sm mt-2">Professional Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-md mb-4">
                  About PlantShop
                </div>
                <h2 className="text-3xl font-light text-gray-900 mb-6">
                  Cultivating Green Spaces Since 2020
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We specialize in providing premium indoor and outdoor plants for modern living and working environments. Our carefully curated selection focuses on quality, sustainability, and ease of care.
                </p>
                <p>
                  Working with trusted growers and suppliers, we ensure each plant meets our strict standards for health and vitality. Our team of horticultural experts provides comprehensive care guidance to support your plant journey.
                </p>
                <p>
                  From corporate installations to home collections, we serve customers who value quality, reliability, and professional service in their plant purchasing decisions.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleScrollToAbout}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
                >
                  Our Story
                  <FaArrowRight className="ml-2 text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Care Guide */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Essential Plant Care</h2>
            <p className="text-lg text-gray-600">Professional tips for healthy plant maintenance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Watering Schedule",
                description: "Establish consistent watering routines based on soil moisture levels and seasonal requirements.",
                icon: "💧"
              },
              {
                title: "Light Requirements", 
                description: "Position plants according to their specific light needs for optimal growth and health.",
                icon: "☀️"
              },
              {
                title: "Environmental Control",
                description: "Maintain appropriate temperature and humidity levels for different plant varieties.",
                icon: "🌡️"
              }
            ].map((tip, index) => (
              <div key={index} className="bg-white p-8 rounded-sm">
                <div className="text-3xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-light text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Receive expert care guides, seasonal recommendations, and product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 px-4 py-3 rounded-sm border-0 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button className="px-8 py-3 bg-white text-green-700 font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;