import axios from 'axios';

const BACKEND_URL = import.meta.env.PROD
  ? 'https://s65-nishat-capstone-codeunity-swbt.onrender.com'
  : 'http://localhost:8080';

export const useCodeExecution = ({ currentFile, code, roomId, socketRef, isAuthenticated, incrementUsage, usageCount, setShowAuthModal, setShowUsageWarning }) => {
  const handleRunCode = async () => {
    if (!currentFile || !code) return null;

    if (!isAuthenticated()) {
      const limitReached = incrementUsage();
      if (limitReached) { setShowAuthModal(true); return null; }
      if (usageCount >= 2) {
        setShowUsageWarning(true);
        setTimeout(() => setShowUsageWarning(false), 5000);
      }
    }

    try {
      const fileExt = currentFile.split('.').pop();
      const res = await axios.post(`${BACKEND_URL}/api/execute`, { language: fileExt, code });
      if (res.data.output) {
        socketRef.current.emit('code-output', { roomId, output: res.data.output });
      }
      return res;
    } catch (err) {
      console.error('Execution error:', err);
      socketRef.current.emit('code-output', { roomId, output: `Error: ${err.message}` });
      throw err;
    }
  };

  return { handleRunCode };
};