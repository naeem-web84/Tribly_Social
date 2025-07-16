import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa"; 
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-content py-8 px-6 md:px-12 lg:px-20 font-urbanist border-t-2 border-primary rounded-t-xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        {/* Left: Logo & About */}
        <div className="space-y-3 max-w-sm">
          <Logo size="sm" />
          <p className="text-sm text-base-content/70 leading-relaxed">
            A community-driven platform to explore, share, and connect through your interests.
          </p>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-base-content mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link>
          <Link to="/posts" className="hover:text-primary transition-colors duration-300">Posts</Link>
          <Link to="/membership" className="hover:text-primary transition-colors duration-300">Membership</Link>
          <Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link>
        </div>

        {/* Right: Social Icons */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-base-content mb-2">Follow Us</h3>
          <div className="flex items-center gap-4">
            {[FaFacebookF, FaTwitter, FaGithub, FaInstagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/70 p-3 rounded-full border border-base-content/30 hover:bg-primary hover:text-primary-content transition-colors duration-300"
                aria-label="Social Link"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 max-w-6xl mx-auto text-center text-sm text-base-content/60 font-medium tracking-wide select-none">
        &copy; {new Date().getFullYear()} Tribly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
