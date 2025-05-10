import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import Logo from '../Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-dark-100 text-white dark:text-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo className="h-8 w-8" />
                <Logo type="text" className="h-6 ml-2" />
              </Link>
            </div>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
              Professional voice communication for logistics and transport since 2025.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/servers" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Voice Servers
                </Link>
              </li>
              <li>
                <Link to="/subscribe" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Subscriptions
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Enterprise Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Custom Integration
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  API Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 text-sm">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-dark-200">
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Legacy Radio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;