import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Posts', path: '/' },
    { label: 'Create Post', path: '/create' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  const buttonClass = (path) =>
    `px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:scale-105 font-semibold ${
      isActive(path)
        ? 'bg-white text-orange-600'
        : 'bg-orange-100/20 text-white hover:bg-white/10'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 shadow-md font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight bg-clip-text text-white drop-shadow-lg"
        >
          Alfred<span className="font-light text-white/80">Blog</span>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-4 text-base">
          {navItems.map(({ label, path }) => (
            <Link key={label} to={path} className={buttonClass(path)}>
              {label}
            </Link>
          ))}

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/auth';
            }}
            className="ml-4 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold transition cursor-pointer shadow-sm"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="md:hidden px-6 pb-4 pt-2 space-y-4 bg-orange-500 shadow-inner border-t border-white/10 animate-slideDown text-white">
          {navItems.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-center px-4 py-2 rounded-full ${
                isActive(path)
                  ? 'bg-white text-orange-600'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              } transition shadow-sm font-semibold`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/auth';
            }}
            className="block w-full text-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition cursor-pointer"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
