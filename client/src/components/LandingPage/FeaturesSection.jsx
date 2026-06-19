import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Bot, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Real-time Collaboration',
    description: 'Code together seamlessly with perfect synchronization across all devices and team members',
  },
  {
    icon: Bot,
    title: 'AI-Powered Assistant',
    description: 'Get intelligent code suggestions, automated debugging, and context-aware assistance',
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'Support for 100+ programming languages with advanced syntax highlighting',
  },
];

const FeaturesSection = ({ featuresRef }) => {
  return (
    <div ref={featuresRef} id="features-section" className="text-center relative">
      <div className="absolute inset-0 bg-gradient-radial from-pink-400/15 via-pink-400/8 to-transparent opacity-70 rounded-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative z-10 space-y-16"
      >
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            <span className="text-pink-300 text-sm font-medium">AI-Powered Collaboration Platform</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-white">Core Features</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Discover the powerful tools that make CodeUnity the ultimate collaborative coding platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="relative group bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-pink-500/20 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300" />
                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesSection;