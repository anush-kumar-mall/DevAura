import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket } from 'lucide-react';

const ABOUT_CARDS = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To democratize collaborative coding by providing developers worldwide with cutting-edge tools that enhance creativity, boost productivity, and foster innovation. We believe that great code emerges when brilliant minds work together seamlessly, regardless of geographical boundaries.',
    animateX: -30,
  },
  {
    icon: Rocket,
    title: 'Our Vision',
    text: 'To become the global standard for collaborative development environments, where every line of code written is enhanced by AI, every collaboration is frictionless, and every developer can reach their full potential through the power of unified teamwork and intelligent assistance.',
    animateX: 30,
  },
];

const AboutSection = ({ aboutRef }) => {
  return (
    <div ref={aboutRef} id="about-section" className="text-center relative">
      <div className="absolute inset-0 bg-gradient-radial from-pink-400/12 via-pink-400/6 to-transparent opacity-60 rounded-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative z-10 space-y-16"
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">About CodeUnity</h2>
          <p className="text-white/80 text-lg max-w-4xl mx-auto leading-relaxed">
            CodeUnity is a revolutionary AI-powered collaborative coding platform that transforms how developers
            work together. Built for the modern era of remote development, we bridge the gap between individual
            creativity and team productivity through seamless real-time collaboration and intelligent code assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {ABOUT_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: card.animateX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-left"
              >
                <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-pink-500/20 hover:border-pink-500/30 transition-all duration-300 h-full group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">{card.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;