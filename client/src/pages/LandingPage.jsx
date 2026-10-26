
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
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Authentication
  const { user, setUserAuth } = useUsageTracking();

  // Refs
  const joinRoomRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const connectRef = useRef(null);

  const refs = {
    aboutRef,
    featuresRef,
    testimonialsRef,
    connectRef,
  };

  // Keep section order consistent with the actual page layout.
  const sections = [
    { name: 'FEATURES', ref: featuresRef },
    { name: 'ABOUT', ref: aboutRef },
    { name: 'TESTIMONIALS', ref: testimonialsRef },
  ];

  // Authentication handlers
  const handleAuth = (userData) => {
    setUserAuth(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('codeunity_user');
    localStorage.removeItem('codeunity_token');
    setUserAuth(null);
  };

  // Scroll to a navbar section
  const scrollToSection = (ref, sectionName) => {
    setIsMenuOpen(false);

    let element = ref?.current;

    if (!element && sectionName) {
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

    if (sectionName === 'HOME') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    }

    if (!element) return;

    const headerHeight = 100;
    const elementTop =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, elementTop - headerHeight),
      behavior: 'smooth',
    });
  };

  // Scroll tracking and active navbar section
  useEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Avoid scheduling duplicate calculations in the same frame.
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;

        const scrollTop = window.scrollY;

        // Show HOME near the top of the page.
        if (scrollTop < 200) {
          setActiveSection('HOME');
          return;
        }

        // Detection point below the sticky navbar.
        const detectionPoint = scrollTop + 120;

        let currentSection = 'HOME';

        // Sections are checked in DOM order.
        // The last section whose top has crossed the detection
        // point becomes active. This works in both scroll directions.
        for (const section of sections) {
          const element = section.ref.current;

          if (!element) continue;

          const sectionTop =
            element.getBoundingClientRect().top + window.scrollY;

          if (sectionTop <= detectionPoint) {
            currentSection = section.name;
          } else {
            // Later sections are further down the page.
            break;
          }
        }

        // Handle reaching the very bottom of the page.
        const documentHeight =
          document.documentElement.scrollHeight;

        const viewportBottom = scrollTop + window.innerHeight;
        const isAtBottom =
          viewportBottom >= documentHeight - 2;

        if (isAtBottom && testimonialsRef.current) {
          currentSection = 'TESTIMONIALS';
        }

        setActiveSection(currentSection);
      });
    };

    // Initial section detection.
    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Create a new room
  const createRoom = () => {
    const id = uuidv4();

    setRoomId(id);

    joinRoomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // Join an existing room
  const joinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      return alert('Both Room ID and Username required');
    }

    navigate(`/editor/${roomId.trim()}`, {
      state: { username: username.trim() },
    });
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
        {/* Modern Dark Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

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
            />
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
          />

          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl" />
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

            <TestimonialsSection
              testimonialsRef={testimonialsRef}
            />
          </div>
        </div>
      </div>

      <Footer
        scrollToSection={scrollToSection}
        refs={refs}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
    </div>
  );
};

export default LandingPage;
