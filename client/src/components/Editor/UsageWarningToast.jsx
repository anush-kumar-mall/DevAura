import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

const UsageWarningToast = ({ showUsageWarning, usageCount }) => {
  if (!showUsageWarning) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex items-center gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 shadow-lg"
      >
        <FaUser className="w-5 h-5" />
        <div className="text-sm">
          <p className="font-medium">Almost at limit!</p>
          <p>You have {3 - usageCount} code runs left. Sign in for unlimited usage.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default UsageWarningToast;