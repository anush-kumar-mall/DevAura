import React from 'react';
import { motion } from 'framer-motion';

const CTASection = ({ onCreateRoom }) => {
  return (
    <div className="text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-10 border border-pink-500/20 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-pink-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Development Workflow?
          </h3>
          <p className="text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of developers who have revolutionized their coding experience with CodeUnity.
            Start collaborating smarter, coding faster, and building better software today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateRoom}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300"
          >
            Start Coding Now →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CTASection;