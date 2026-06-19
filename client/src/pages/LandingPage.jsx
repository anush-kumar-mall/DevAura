import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AuthModal from '../components/AuthModal';
import { useUsageTracking } from '../hooks/Editor/useUsageTracking';

import Navbar from '../components/LandingPage/Navbar';
import HeroSection from '../components/LandingPage/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import CTASection from '../components/LandingPage/CTASection';
import AboutSection from '../components/LandingPage/AboutSection';
import TestimonialsSection from '../components/LandingPage/TestimonialsSection';
import Footer from '../components/LandingPage/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('HOME');
  const [isManualNavigation, setIsManualNavigation] = useState(false);

  // Authentication
  const { user, setUserAuth } = useUsageTracking();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const joinRoomRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const connectRef = useRef(null);

  const refs = { aboutRef, featuresRef, testimonialsRef, connectRef };

  // Authentication handlers
  const handleAuth = (userData) => {
    setUserAuth(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('codeunity_user');
    localStorage.removeItem('codeunity_token');
    setUserAuth(null);
  };

  const scrollToSection = (ref, sectionName) => {
    if (sectionName === 'HOME') {
      setIsManualNavigation(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('HOME');
      setIsMenuOpen(false);

      setTimeout(() => setIsManualNavigation(false), 800);
      return;
    }

    setIsManualNavigation(true);
    setActiveSection(sectionName);
    setIsMenuOpen(false);

    let element = ref?.current;

    if (!element) {
      const sectionMap = {
        ABOUT: 'about-section',
        FEATURES: 'features-section',
        TESTIMONIALS: 'testimonials-section',
        CONTACT: 'contact-section',
      };

      const elementId = sectionMap[sectionName];
      if (elementId) {
        element = document.getElementById(elementId);
      }
    }

    if (!element) {
      setIsManualNavigation(false);
      return;
    }

    // Get the element position using getBoundingClientRect
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = 100; // Account for sticky header with some extra padding
    const targetPosition = rect.top + scrollTop - headerHeight;

    // Direct scroll approach
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    // Reset manual navigation flag after scrolling completes
    setTimeout(() => {
      setIsManualNavigation(false);
    }, 800);
  };

  // Scroll tracking and section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Don't update active section if user manually clicked navigation
      if (isManualNavigation) {
        return;
      }

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollCenter = scrollTop + viewportHeight / 2; // Use center of viewport for detection

      // If we're at the very top, always show HOME
      if (scrollTop < 200) {
        setActiveSection('HOME');
        return;
      }

      // Get all section elements and their positions
      const sections = [
        { name: 'ABOUT', ref: aboutRef },
        { name: 'FEATURES', ref: featuresRef },
        { name: 'TESTIMONIALS', ref: testimonialsRef },
        { name: 'CONTACT', ref: connectRef },
      ];

      let newActiveSection = 'HOME';
      let closestSection = null;
      let minDistance = Infinity;

      // Find which section's center is closest to the viewport center
      sections.forEach((section) => {
        if (section.ref?.current) {
          const element = section.ref.current;
          const rect = element.getBoundingClientRect();
          const elementTop = scrollTop + rect.top;
          const elementBottom = elementTop + rect.height;
          const elementCenter = elementTop + rect.height / 2;

          // Check if viewport center is within this section's bounds
          if (scrollCenter >= elementTop - 100 && scrollCenter <= elementBottom + 100) {
            const distance = Math.abs(scrollCenter - elementCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = section.name;
            }
          }
        }
      });

      if (closestSection) {
        newActiveSection = closestSection;
      } else {
        // Fallback: find the section we've scrolled past most recently
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.ref?.current) {
            const elementTop = section.ref.current.offsetTop;
            if (scrollTop >= elementTop - 200) {
              newActiveSection = section.name;
              break;
            }
          }
        }
      }

      setActiveSection(newActiveSection);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isManualNavigation]);

  const createRoom = () => {
    const id = uuidv4();
    setRoomId(id);
    joinRoomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const joinRoom = () => {
    if (!roomId || !username) return alert('Both Room ID and Username required');
    navigate(`/editor/${roomId}`, { state: { username } });
  };

  return (
    <div className="min-h-screen relative bg-black/90">
      <Navbar
        scrollY={scrollY}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        refs={refs}
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Content with Background */}
      <div className="relative overflow-hidden">
        {/* Modern Dark Background with Geometric Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>

          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
                backgroundSize: '50px 50px',
              }}
            ></div>
          </div>

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.05) 2px,
              rgba(255,255,255,0.05) 4px
            )`,
            }}
          ></div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl"></div>
        </div>

        <HeroSection
          joinRoomRef={joinRoomRef}
          roomId={roomId}
          setRoomId={setRoomId}
          username={username}
          setUsername={setUsername}
          onCreateRoom={createRoom}
          onJoinRoom={joinRoom}
        />

        {/* Additional Sections */}
        <div className="relative z-10 px-6 lg:px-12 pb-24">
          <div className="max-w-7xl mx-auto space-y-32">
            <FeaturesSection featuresRef={featuresRef} />
            <CTASection onCreateRoom={createRoom} />
            <AboutSection aboutRef={aboutRef} />
            <TestimonialsSection testimonialsRef={testimonialsRef} />
          </div>
        </div>
      </div>

      <Footer scrollToSection={scrollToSection} refs={refs} />

      {/* Authentication Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onAuth={handleAuth} />
    </div>
  );
};

export default LandingPage;