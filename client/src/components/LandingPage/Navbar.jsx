import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import codeunityLogo from '../../assets/logo.png';

const NAV_ITEMS = [
  { name: 'HOME' },
  { name: 'FEATURES' },
  { name: 'ABOUT' },
  { name: 'TESTIMONIALS' },
  { name: 'CONTACT' },
];

const Navbar = ({
  scrollY,
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  refs,
  user,
  onLoginClick,
  onLogout,
}) => {
  const getRef = (name) => {
    const map = {
      ABOUT: refs.aboutRef,
      FEATURES: refs.featuresRef,
      TESTIMONIALS: refs.testimonialsRef,
      CONTACT: refs.connectRef,
    };
    return map[name] || null;
  };

  return (
    <nav
      className="sticky top-0 z-50 px-6 lg:px-12 py-2"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${Math.min(0.95, 0.7 + scrollY * 0.001)})`,
        backdropFilter: `blur(${Math.min(20, 12 + scrollY * 0.02)}px)`,
      }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
          <img src={codeunityLogo} alt="CodeUnity" className="h-10 w-auto object-contain" />
          <span className="text-white font-bold text-xl tracking-tight">CODE UNITY</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection(getRef(item.name), item.name);
              }}
              className={`text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeSection === item.name
                  ? 'text-white relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-pink-500'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-pink-500/30">
                <FaUser className="w-3 h-3 text-pink-400" />
                <span className="text-xs text-white font-medium">{user.username}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-black/30 hover:bg-black/40 border border-pink-500/20 hover:border-pink-500/30 text-white/80 hover:text-white transition-all duration-200"
                title="Logout"
              >
                <FaSignOutAlt className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <motion.button
              onClick={onLoginClick}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(236, 72, 153, 0.25)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/15 to-pink-500/15 border border-pink-500/30 hover:border-pink-500/50 text-white transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <FaUser className="w-3 h-3" />
                <span className="text-sm font-semibold">Sign In</span>
              </div>
            </motion.button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden text-white p-2"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.div
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-full bg-white origin-left"
            />
            <motion.div
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-full bg-white"
            />
            <motion.div
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-full bg-white origin-left"
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="pt-6 pb-4 space-y-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection(getRef(item.name), item.name);
              }}
              className={`block text-left text-sm font-medium transition-colors duration-300 ${
                activeSection === item.name
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}

          <div className="pt-2 border-t border-pink-500/20">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-white">{user.username}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg bg-black/30 border border-pink-500/20 text-white/80 hover:text-white transition-all duration-200"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <motion.button
                onClick={() => {
                  onLoginClick();
                  setIsMenuOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2.5 rounded-xl border border-pink-500/30 hover:border-pink-500/50 text-pink-400 hover:text-pink-300 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  <span className="text-sm font-semibold">Sign In</span>
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;