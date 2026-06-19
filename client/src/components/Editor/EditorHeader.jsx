import { motion } from 'framer-motion';
import { FaShare, FaUser, FaSignOutAlt } from 'react-icons/fa';

const EditorHeader = ({
  activeTab,
  currentFile,
  user,
  usageCount,
  isLimitReached,
  isAuthenticated,
  onLogout,
  onShowAuthModal,
  onDownloadProject,
  onShowShareModal,
}) => {
  return (
    <motion.div
      className="h-14 px-6 flex items-center justify-between border-b border-pink-500/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-white font-semibold text-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Code
          </span>
          <span className="text-white">Unity</span>
        </h1>

        {activeTab === 'draw' ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
            <span className="px-3 py-1 rounded-lg bg-gray-900/50 border border-gray-700/30 text-sm text-gray-300">
              Collaborative Whiteboard
            </span>
          </div>
        ) : currentFile && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
            <span className="px-3 py-1 rounded-lg bg-gray-900/50 border border-gray-700/30 text-sm text-gray-300 font-mono">
              {currentFile}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* User Authentication Section */}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <FaUser className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-300 font-medium">{user.username}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/20 hover:border-gray-500/30 text-gray-400 hover:text-gray-300 transition-all duration-200"
              title="Logout"
            >
              <FaSignOutAlt className="w-3 h-3" />
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {!isLimitReached && (
              <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <span className="text-xs text-purple-300 font-medium">
                  {3 - usageCount} runs left
                </span>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShowAuthModal}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/30 text-pink-400 hover:text-pink-300 transition-all duration-200"
              title="Sign In"
            >
              <span className="text-xs font-medium">Sign In</span>
            </motion.button>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownloadProject}
          className="p-2.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 hover:border-pink-500/30 text-pink-400 transition-all duration-200 group"
          title="Download Project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowShareModal}
          className="p-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/30 text-purple-400 transition-all duration-200 group"
          title="Share"
        >
          <FaShare className="w-4 h-4 group-hover:animate-pulse" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EditorHeader;