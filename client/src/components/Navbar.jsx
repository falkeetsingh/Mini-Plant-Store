import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

const Navbar = () => {
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScrollToAbout = () => {
    navigate('/', { state: { scrollTo: 'about-section' } });
  };

  const plantCategories = [
    ['Indoor Plants', 'Succulents, Air Plants, Ferns', '/products?category=Indoor'],
    ['Outdoor Plants', 'Garden, Flowering, Trees', '/products?category=Outdoor'],
    ['Succulents', 'Cacti, Aloe, Jade Plants', '/products?category=Succulent'],
    ['Flowering Plants', 'Roses, Orchids, Tulips', '/products?category=Flowering'],
    ['Herbs & Vegetables', 'Basil, Mint, Tomatoes', '/products?category=Herbs'],
    ['Plant Accessories', 'Pots, Tools, Fertilizers', '/products?category=Accessories'],
  ];

  return (
    <>
      {/* Professional Clean Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Professional Logo Section */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-green-700 rounded-sm flex items-center justify-center">
                <svg className="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-semibold text-gray-900">
                  PlantShop
                </span>
                <span className="text-xs text-gray-500 font-normal hidden sm:block">
                  Professional Plant Retailer
                </span>
              </div>
            </Link>

            {/* Clean Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-green-700 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-green-700 transition-colors duration-200 font-medium"
                >
                  Products
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <Link 
                to="/care-guide"
                className="text-gray-700 hover:text-green-700 transition-colors duration-200 font-medium"
              >
                Care Guide
              </Link>
              
              <button 
                onClick={handleScrollToAbout} 
                className="text-gray-700 hover:text-green-700 transition-colors duration-200 font-medium"
              >
                About
              </button>
            </div>

            {/* Clean Right Side Icons */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* User Icons - Only show if logged in */}
              {user && (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/wishlist" 
                    className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-200"
                    title="My Wishlist"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  
                  <Link 
                    to="/cart" 
                    className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-200"
                    title="Shopping Cart"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m10-5v6a1 1 0 01-1 1H9a1 1 0 01-1-1v-6m8 0V9a1 1 0 00-1-1H9a1 1 0 00-1 1v4.01" />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Clean User Profile or Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-1 rounded-sm hover:bg-gray-100 transition-colors duration-200"
                  >
                    {user.profilePhoto ? (
                      <img
                        src={
                          user.profilePhoto.startsWith("http")
                            ? user.profilePhoto
                            : `${BACKEND_URL}${user.profilePhoto}`
                        }
                        alt="Profile"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                  
                  {/* Clean User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-sm shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">Account</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        
                        <Link to="/orders" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          My Orders
                        </Link>
                        
                        <Link to="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </Link>
                        
                        <Link to="/wishlist" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          My Wishlist
                        </Link>

                        <Link to="/plant-care" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Plant Care Guide
                        </Link>
                        
                        {user?.isAdmin && (
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <Link to="/admin/dashboard" className="flex items-center px-4 py-3 text-sm text-green-700 hover:bg-green-50 transition-colors duration-200">
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              Admin Dashboard
                            </Link>
                            <Link to="/admin/dashboard/products" className="flex items-center px-4 py-3 text-sm text-green-700 hover:bg-green-50 transition-colors duration-200">
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                              Manage Plants
                            </Link>
                            <Link to="/admin/dashboard/orders" className="flex items-center px-4 py-3 text-sm text-green-700 hover:bg-green-50 transition-colors duration-200">
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              Manage Orders
                            </Link>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={async () => {
                              await dispatch(logoutUser());
                              setIsUserMenuOpen(false);
                              navigate('/');
                            }}
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 md:px-6 md:py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-sm transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Clean Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Clean Categories Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plantCategories.map(([title, desc, url]) => (
                  <Link
                    key={title}
                    to={url}
                    className="block p-4 hover:bg-gray-50 rounded-sm transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900 mb-1">
                      {title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {desc}
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Featured Collections</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-sm border border-gray-200">
                      <div className="font-medium text-gray-900">Beginner Friendly</div>
                      <div className="text-sm text-gray-600">Easy care plants for new plant parents</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-sm border border-gray-200">
                      <div className="font-medium text-gray-900">Care Support</div>
                      <div className="text-sm text-gray-600">Expert guidance and plant care resources</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-sm border border-gray-200">
                      <div className="font-medium text-gray-900">Professional Service</div>
                      <div className="text-sm text-gray-600">Quality plants with health guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clean Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-sm transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="space-y-2">
                <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Product Categories
                </div>
                {plantCategories.map(([title, , url]) => (
                  <Link
                    key={title}
                    to={url}
                    className="block px-4 py-3 text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-sm transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {title}
                  </Link>
                ))}
              </div>

              <Link 
                to="/care-guide"
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-sm transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Care Guide
              </Link>
              
              <button 
                onClick={() => {
                  handleScrollToAbout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-sm transition-colors duration-200"
              >
                About Us
              </button>

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-sm transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Clean Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-30" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;