import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    company: 'TechCorp',
    quote: 'CodeUnity has revolutionized how our team collaborates. The AI assistance is incredibly helpful!',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Full Stack Engineer',
    company: 'StartupLab',
    quote: "Real-time collaboration has never been this smooth. It's like having the whole team in one room.",
  },
  {
    name: 'Emily Johnson',
    role: 'DevOps Engineer',
    company: 'CloudTech',
    quote: 'The AI-powered suggestions have saved us countless hours of debugging. Absolutely love it!',
  },
  {
    name: 'David Kim',
    role: 'Backend Developer',
    company: 'DataFlow',
    quote: 'Perfect for remote teams. The synchronization is flawless and the interface is intuitive.',
  },
  {
    name: 'Lisa Thompson',
    role: 'Mobile Developer',
    company: 'AppStudio',
    quote: 'CodeUnity has become an essential tool for our development workflow. Highly recommended!',
  },
  {
    name: 'Alex Morgan',
    role: 'Tech Lead',
    company: 'InnovateLab',
    quote: "The best collaborative coding platform I've used. The AI features are game-changing.",
  },
];

const TestimonialsSection = ({ testimonialsRef }) => {
  return (
    <div ref={testimonialsRef} id="testimonials-section" className="text-center relative">
      <div className="absolute inset-0 bg-gradient-radial from-pink-400/14 via-pink-400/7 to-transparent opacity-65 rounded-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative z-10 space-y-12"
      >
        <h2 className="text-5xl font-bold text-white">What Developers Say</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="relative group bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-pink-500/20 hover:border-pink-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-white/80 text-xl">★</span>
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic leading-relaxed">"{t.quote}"</p>
                <div className="text-center pt-4 border-t border-pink-900/50">
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-white/60 text-sm">{t.role}</p>
                  <p className="text-white/80 text-sm font-medium">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;