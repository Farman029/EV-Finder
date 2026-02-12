import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Assuming you have react-icons installed

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-5  rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Park & Charge</h3>
            <p className="text-gray-400 text-sm">
              Empowering your journey with reliable EV charging solutions. Find, book, and charge with ease.
            </p>
          </div>

          {/* Quick Links - Drivers */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">For Drivers</h4>
            <ul className="space-y-2">
              <li>
                <Link  className="text-gray-400 hover:text-green-400 transition">Find Stations</Link>
              </li>
              <li>
                <Link  className="text-gray-400 hover:text-green-400 transition">My Bookings</Link>
              </li>
              <li>
                <Link  className="text-gray-400 hover:text-green-400 transition">Trip Planner</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Hosts/Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-green-400 transition">About Us</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-green-400 transition">Become a Host</Link>
              </li>
              <li>
                <Link  className="text-gray-400 hover:text-green-400 transition">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedin size={20} /></a>
            </div>
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Park & Charge. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>Privacy Policy | Terms of Service</p>
            <p className="mt-2 md:mt-0">Made by <span class=" hover:text-green-400">  Farman  </span>  </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;