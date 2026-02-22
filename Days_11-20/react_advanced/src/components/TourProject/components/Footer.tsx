import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-chart-2 text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-chart-5">Galaxy Tours</h3>
            <p className="text-sm text-gray-200">
              Discover the world with us. Your gateway to unforgettable travel experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-chart-5 mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-chart-5 mb-4">Services</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/services"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  Book Now
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  Travel Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-chart-5 mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <p className="font-semibold text-chart-5">Email</p>
                <a
                  href="mailto:info@galaxytours.com"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  info@galaxytours.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-chart-5">Phone</p>
                <a
                  href="tel:+1234567890"
                  className="text-gray-200 hover:text-chart-5 transition duration-300"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <p className="font-semibold text-chart-5">Address</p>
                <p className="text-gray-200">
                  123 Travel Street, Tourism City, TC 12345
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 py-8">
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="#"
              className="text-gray-200 hover:text-chart-5 transition duration-300 text-2xl"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-chart-5 transition duration-300 text-2xl"
              aria-label="Twitter"
            >
              𝕏
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-chart-5 transition duration-300 text-2xl"
              aria-label="Instagram"
            >
              📷
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-chart-5 transition duration-300 text-2xl"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-6">
            <p className="text-center text-sm mb-3">Subscribe to our newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-chart-5"
              />
              <button className="bg-chart-5 text-black px-6 py-2 rounded font-semibold hover:bg-chart-4 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-300 border-t border-gray-600 pt-6">
          <p>
            © {currentYear} Galaxy Tours. All rights reserved. | 
            <a href="#" className="hover:text-chart-5 transition ml-1">
              Privacy Policy
            </a>
            {" "} | 
            <a href="#" className="hover:text-chart-5 transition ml-1">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;