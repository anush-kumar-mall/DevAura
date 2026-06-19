import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ joinRoomRef, roomId, setRoomId, username, setUsername, onCreateRoom, onJoinRoom }) => {
  return (
    <div className="relative z-10 px-6 lg:px-12 pt-20 pb-32 overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-600/30 via-pink-600/20 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-600/25 via-pink-600/15 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Hero Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight"
              >
                <span className="block text-white">Code Together.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-400 to-pink-500">
                  Build Faster.
                </span>
                <span className="block text-white">With AI Power.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base lg:text-lg text-white/80 leading-relaxed pt-4"
              >
                Real-time code synchronization, AI-powered suggestions, and seamless team collaboration.
                Everything you need to build amazing projects together.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCreateRoom}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold shadow-lg shadow-pink-500/30 border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300"
              >
                Start Building
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => joinRoomRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-xl border-2 border-pink-600/50 text-pink-300 font-bold hover:bg-black/50 hover:border-pink-500 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-pink-900/50"
            >
              {[
                { value: '50K+', label: 'Users' },
                { value: '10K+', label: 'Projects' },
                { value: '100+', label: 'Languages' },
              ].map((stat) => (
                <motion.div key={stat.label} whileHover={{ y: -3 }} className="space-y-1">
                  <div className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300">
                    {stat.value}
                  </div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Join Room Form */}
          <motion.div
            ref={joinRoomRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-pink-500/10 to-transparent rounded-3xl blur-2xl" />

            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 border border-pink-500/20 shadow-2xl">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
                  <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                  <span className="text-pink-300 text-xs font-medium">Start Coding Now</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Join Room</h2>
                <p className="text-white/80 text-sm">Start collaborating with your team instantly</p>
              </div>

              {/* Inputs */}
              <div className="space-y-5">
                {[
                  { label: 'Room ID', placeholder: 'Enter room identifier', value: roomId, onChange: setRoomId },
                  { label: 'Username', placeholder: 'Enter your username', value: username, onChange: setUsername },
                ].map((field) => (
                  <div key={field.label} className="space-y-2">
                    <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-pink-500 to-pink-500 rounded-full" />
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/30 text-white placeholder-white/40 border border-pink-500/20 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/50 transition-all"
                    />
                  </div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onJoinRoom}
                  className="w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-pink-500/20"
                >
                  Join Room →
                </motion.button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-pink-500/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-black/60 px-3 text-white/60 text-xs">or</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCreateRoom}
                  className="w-full px-5 py-3.5 rounded-xl border border-pink-600/50 text-white font-semibold text-base hover:bg-black/50 hover:border-pink-500/50 transition-all duration-300"
                >
                  Create New Room
                </motion.button>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 pt-6 border-t border-pink-900/50">
                <div className="flex items-center justify-center gap-6 text-xs text-white/50">
                  {[
                    { label: 'Secure', path: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' },
                    { label: 'Collaborative', path: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' },
                    { label: 'AI-Powered', path: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={item.path} clipRule="evenodd" />
                      </svg>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;