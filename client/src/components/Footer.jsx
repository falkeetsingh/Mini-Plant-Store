import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">PlantShop</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Professional plant retailer specializing in premium indoor and outdoor plants for modern living spaces.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-300">
                    456 Garden Boulevard<br />
                    New Delhi, India 110002
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-300">+91 98765 43210</span>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-300">info@plantshop.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-medium text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '#' },
                { name: 'Our Story', href: '#' },
                { name: 'Careers', href: '#' },
                { name: 'Press', href: '#' },
                { name: 'Contact', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-medium text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { name: 'Plant Categories', href: '#' },
                { name: 'Care Guides', href: '#' },
                { name: 'Consultation', href: '#' },
                { name: 'Delivery Info', href: '#' },
                { name: 'Return Policy', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-medium text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to receive care tips and product updates.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-sm text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-600"
              />
              <button className="w-full px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-sm hover:bg-green-800 transition-colors duration-200">
                Subscribe
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-gray-300 mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {[
                  { name: 'Facebook', viewBox: '0 0 24 24', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'Instagram', viewBox: '0 0 24 24', path: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.8-.568-1.07-.568-2.390 0-3.46.568-1.07 1.719-1.8 3.016-1.8s2.448.73 3.016 1.8c.568 1.07.568 2.39 0 3.46-.568 1.07-1.719 1.8-3.016 1.8z' },
                  { name: 'LinkedIn', viewBox: '0 0 24 24', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-8 h-8 bg-gray-800 hover:bg-green-700 rounded-sm flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox={social.viewBox}>
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} PlantShop. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;