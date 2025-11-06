'use client';

import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string>('home'); // default active
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Update underline position when activeLink changes
  useEffect(() => {
    const index = navLinks.findIndex(link => link.name.toLowerCase() === activeLink);
    const currentLink = linksRef.current[index];
    if (currentLink) {
      setUnderlineStyle({
        left: currentLink.offsetLeft,
        width: currentLink.offsetWidth,
      });
    }
  }, [activeLink]);

  return (
    <nav className="bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          
          {/* Logo / Brand section */}
          <div className="flex-shrink-0">
            <span className="font-bold text-xl">Logo</span>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex space-x-8 relative">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                ref={el => (linksRef.current[index] = el)}
                href={link.href}
                onClick={() => setActiveLink(link.name.toLowerCase())}
                className="hover:text-gray-300 relative py-2"
              >
                {link.name}
              </a>
            ))}

            {/* Sliding underline */}
            <span
              className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
            />
          </div>

          {/* Call-to-action button */}
          <div className="hidden md:flex">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
