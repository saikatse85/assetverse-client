import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import ActiveNavLink from "../ActiveNavLink/ActiveNavLink";

const Footer = () => {
  return (
    <footer className="bg-base-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Contact Us
          </h3>
          <p className="dark:text-white">
            Email:{" "}
            <a
              href="mailto:info@yourdomain.com"
              className="text-[#00e5ff] hover:text-[#00bcd4] hover:underline"
            >
              info@yourdomain.com
            </a>
          </p>
          <p className="dark:text-white">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-[#00e5ff] hover:text-[#00bcd4] hover:underline"
            >
              +1 234 567 890
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Quick Links
          </h3>
          <div className="space-y-2">
            <div className="flex md:flex flex-col gap-6 text-[16px] font-medium">
              <ActiveNavLink to="/">Home</ActiveNavLink>
              <ActiveNavLink to="/about-us">About Us</ActiveNavLink>
              <ActiveNavLink to="/services">Services</ActiveNavLink>
              <ActiveNavLink to="contact">Contact</ActiveNavLink>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary text-gray-800 dark:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary text-gray-800 dark:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary text-gray-800 dark:text-white transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary text-gray-800 dark:text-white transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500 dark:text-white">
        © {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
