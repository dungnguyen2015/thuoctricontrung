'use client';

import React, { useState } from 'react';
import { Menu, X, PhoneCall, Home, Hammer, Info, Contact, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { name: 'Trang chủ', href: '/', icon: Home },
    { name: 'Dịch vụ', href: '/dich-vu', icon: Hammer },
    { name: 'Bài viết', href: '/bai-viet', icon: Info },
    { name: 'Liên hệ', href: '/lien-he', icon: Contact },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <a href="/">
        <div className="flex items-center space-x-2">
          
            <Wrench className="w-7 h-7 text-red-700" />
            <span className="text-2xl font-bold text-red-700">Trung Điện Lạnh</span>
          
        </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="text-gray-700 hover:text-red-700 font-medium transition"
            >
              {name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-2">
          <PhoneCall className="text-red-700 w-5 h-5" />
          <a href="tel:0932383966" className="text-red-700 font-semibold hover:underline">
            0932 383 966
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md rounded-b-2xl px-6 py-4"
          >
            <div className="space-y-4">
              {navItems.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="flex items-center space-x-2 text-gray-800 hover:text-red-700 text-lg font-medium"
                >
                  <Icon className="w-5 h-5" />
                  <span>{name}</span>
                </a>
              ))}

              <div className="mt-4 flex items-center justify-center space-x-2 text-red-700 font-bold">
                <PhoneCall className="w-5 h-5" />
                <a href="tel:0932383966" className="hover:underline">
                  0932 383 966
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;