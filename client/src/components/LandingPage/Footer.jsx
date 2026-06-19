import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import codeunityLogo from '../../assets/logo.png';

const PRODUCT_FEATURES = [
  'Real-time Collaboration',
  'AI Code Assistant',
  'Multi-language Support',
  'Code Execution',
  'Team Management',
  'Version Control',
];

const SOCIAL_LINKS = [
  { icon: FaLinkedin, href: '', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/anush-kumar-mall', label: 'GitHub' },
  { icon: FaInstagram, href: '', label: 'Instagram' },
];

const Footer = ({ scrollToSection, refs }) => {
  const quickLinks = [
    { name: 'Home', ref: null },
    { name: 'Features', ref: refs.featuresRef },
    { name: 'Testimonials', ref: refs.testimonialsRef },
    { name: 'Contact', ref: refs.connectRef },
  ];

  return (
    <footer className="relative z-10 bg-black/90 backdrop-blur-xl border-t border-pink-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
              <img src={codeunityLogo} alt="CodeUnity" className="h-10 w-auto object-contain" />
              <span className="text-white font-bold text-xl tracking-tight">CODE UNITY</span>
            </motion.div>

            <blockquote className="text-white/80 italic text-sm leading-relaxed">
              "Code is like humor. When you have to explain it, it's bad."<br />
              <span className="text-pink-400 not-italic font-medium">- Cory House</span>
            </blockquote>

            <p className="text-white/70 text-sm leading-relaxed">
              Empowering developers worldwide with AI-enhanced collaborative coding solutions.
              Building the future of software development, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() =>
                      link.ref
                        ? scrollToSection(link.ref)
                        : window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className="text-white/70 hover:text-white transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Product</h3>
            <ul className="space-y-3">
              {PRODUCT_FEATURES.map((feature) => (
                <li key={feature} className="text-white/70 text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Connect With Us</h3>

            <div className="space-y-4">
              <motion.a
                href="mailto:mallanushkumar@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
              >
                <MdEmail className="text-lg" />
                <span className="text-sm">mallanushkumar@gmail.com</span>
              </motion.a>

              <div className="flex items-center gap-3 text-white/70">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Remote • Worldwide</span>
              </div>
            </div>

            <div>
              <p className="text-white/70 text-sm mb-4">Follow us on social media</p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-pink-500/20 hover:bg-pink-600/20 hover:border-pink-400/50 transition-all"
                    aria-label={label}
                  >
                    <Icon className="text-lg text-white/80" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-900/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © 2026 DevAura. All rights reserved. Built with ❤️ by Anush Kumar Mall.
            </div>
            <div className="flex gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="text-white/70 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;