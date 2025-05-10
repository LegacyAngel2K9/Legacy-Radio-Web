import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-dark-100 dark:text-gray-100',
          style: {
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#059669',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#DC2626',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;