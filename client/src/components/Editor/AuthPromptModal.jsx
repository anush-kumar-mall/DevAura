import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const AuthPromptModal = ({ showAuthModal, setShowAuthModal }) => {
  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowAuthModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <FaUser className="text-pink-400" />
                  Authentication Required
                </h3>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-white/50 hover:text-white/80 transition-colors p-1"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Auth Content */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  To access this feature, please authenticate yourself. This helps us track usage and manage access.
                </p>

                <button
                  onClick={async () => {
                    setShowAuthModal(false);
                    await new Promise(resolve => setTimeout(resolve, 300));
                    window.open('https://codeunity.vercel.app/auth', '_blank');
                  }}
                  className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-pink-400 hover:from-pink-500/30 hover:to-purple-600/30 transition-all duration-200"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span className="text-sm font-medium">Authenticate with CodeUnity</span>
                </button>
              </div>

              {/* Note */}
              <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 text-sm">
                  ⚠️ Note: Usage limits apply. Please check your email for usage notifications.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthPromptModal;