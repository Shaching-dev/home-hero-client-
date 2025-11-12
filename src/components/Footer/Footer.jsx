import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link } from "react-router";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-5">
      <Container>
        <div className="max-w-9xl  mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">HomeHero</h2>
            <p className="text-gray-400 leading-relaxed">
              HomeHero is a modern web application that connects users with
              trusted local service providers such as electricians, plumbers,
              and cleaners. Users can browse services, book appointments, and
              leave ratings, while providers can manage their listings.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-indigo-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} /> support@homehero.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} /> +1 (555) 987-6543
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} /> 123 Main Street, Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-400 transition">
                <Facebook size={22} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition">
                <Twitter size={22} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition">
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-gray-700 mt-10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} HomeHero — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
