import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaCopy, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const BACKEND_URL = import.meta.env.PROD
  ? 'https://devaura-3l4q.onrender.com'
  : 'https://devaura-3l4q.onrender.com';

const ShareModal = ({ showShareModal, setShowShareModal, roomId, username }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailForm, setEmailForm] = useState({
    recipientEmail: '',
    recipientName: '',
    message: ''
  });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleCopyRoomId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy room ID:', error);
      const textArea = document.createElement('textarea');
      textArea.value = roomId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [roomId]);

  const handleShareViaEmail = useCallback(async () => {
    if (!emailForm.recipientEmail) {
      alert('Please enter recipient email address');
      return;
    }

    setEmailSending(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/email/share-room`, {
        recipientEmail: emailForm.recipientEmail,
        recipientName: emailForm.recipientName,
        senderName: username,
        roomId: roomId,
        message: emailForm.message
      });

      if (response.data.success) {
        setEmailSuccess(true);
        setEmailForm({ recipientEmail: '', recipientName: '', message: '' });
        setTimeout(() => {
          setEmailSuccess(false);
          setShowShareModal(false);
        }, 2000);
      } else {
        alert(response.data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(error.response?.data?.message || 'Failed to send email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  }, [emailForm, roomId, username, setShowShareModal]);

  return (
    <AnimatePresence>
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
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
                  <FaShare className="text-pink-400" />
                  Share Room
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-white/50 hover:text-white/80 transition-colors p-1"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Room ID Display */}
              <div className="mb-6 p-4 bg-black/30 rounded-lg border border-gray-700/30">
                <p className="text-sm text-gray-400 mb-2">Room ID</p>
                <p className="text-white font-mono text-sm break-all">{roomId}</p>
              </div>

              {/* Share Options */}
              <div className="space-y-4">
                <button
                  onClick={handleCopyRoomId}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50 transition-all duration-300"
                >
                  {copySuccess ? <FaCheck className="w-5 h-5" /> : <FaCopy className="w-5 h-5" />}
                  <span>
                    {copySuccess ? 'Copied to Clipboard!' : 'Copy Room ID'}
                  </span>
                </button>

                {/* Email Sharing Form */}
                <div className="border border-gray-700/30 rounded-lg p-4 bg-black/20">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4" />
                    Send Email Invitation
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <input
                        type="email"
                        placeholder="Recipient's email address *"
                        value={emailForm.recipientEmail}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, recipientEmail: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Recipient's name (optional)"
                        value={emailForm.recipientName}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, recipientName: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Personal message (optional)"
                        value={emailForm.message}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30 resize-none"
                      />
                    </div>

                    <button
                      onClick={handleShareViaEmail}
                      disabled={emailSending || !emailForm.recipientEmail}
                      className={`w-full flex items-center justify-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        emailSuccess
                          ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                          : emailSending || !emailForm.recipientEmail
                          ? 'bg-gray-600/30 border border-gray-500/30 text-gray-400 cursor-not-allowed'
                          : 'bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 hover:border-pink-500/30'
                      }`}
                    >
                      {emailSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : emailSuccess ? (
                        <>
                          <FaCheck className="w-5 h-5" />
                          <span>Email Sent!</span>
                        </>
                      ) : (
                        <>
                          <FaEnvelope className="w-5 h-5" />
                          <span>Send Invitation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                <p className="text-pink-300 text-sm">
                  💡 Share the room URL with your team members to collaborate in real-time!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaCopy, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const BACKEND_URL = import.meta.env.PROD
  ? 'https://devaura-3l4q.onrender.com'
  : 'https://devaura-3l4q.onrender.com';

const ShareModal = ({ showShareModal, setShowShareModal, roomId, username }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailForm, setEmailForm] = useState({
    recipientEmail: '',
    recipientName: '',
    message: ''
  });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleCopyRoomId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy room ID:', error);
      const textArea = document.createElement('textarea');
      textArea.value = roomId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [roomId]);

  const handleShareViaEmail = useCallback(async () => {
    if (!emailForm.recipientEmail) {
      alert('Please enter recipient email address');
      return;
    }

    setEmailSending(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/email/share-room`, {
        recipientEmail: emailForm.recipientEmail,
        recipientName: emailForm.recipientName,
        senderName: username,
        roomId: roomId,
        message: emailForm.message
      });

      if (response.data.success) {
        setEmailSuccess(true);
        setEmailForm({ recipientEmail: '', recipientName: '', message: '' });
        setTimeout(() => {
          setEmailSuccess(false);
          setShowShareModal(false);
        }, 2000);
      } else {
        alert(response.data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(error.response?.data?.message || 'Failed to send email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  }, [emailForm, roomId, username, setShowShareModal]);

  return (
    <AnimatePresence>
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
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
                  <FaShare className="text-pink-400" />
                  Share Room
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-white/50 hover:text-white/80 transition-colors p-1"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Room ID Display */}
              <div className="mb-6 p-4 bg-black/30 rounded-lg border border-gray-700/30">
                <p className="text-sm text-gray-400 mb-2">Room ID</p>
                <p className="text-white font-mono text-sm break-all">{roomId}</p>
              </div>

              {/* Share Options */}
              <div className="space-y-4">
                <button
                  onClick={handleCopyRoomId}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50 transition-all duration-300"
                >
                  {copySuccess ? <FaCheck className="w-5 h-5" /> : <FaCopy className="w-5 h-5" />}
                  <span>
                    {copySuccess ? 'Copied to Clipboard!' : 'Copy Room ID'}
                  </span>
                </button>

                {/* Email Sharing Form */}
                <div className="border border-gray-700/30 rounded-lg p-4 bg-black/20">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4" />
                    Send Email Invitation
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <input
                        type="email"
                        placeholder="Recipient's email address *"
                        value={emailForm.recipientEmail}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, recipientEmail: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Recipient's name (optional)"
                        value={emailForm.recipientName}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, recipientName: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Personal message (optional)"
                        value={emailForm.message}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30 resize-none"
                      />
                    </div>

                    <button
                      onClick={handleShareViaEmail}
                      disabled={emailSending || !emailForm.recipientEmail}
                      className={`w-full flex items-center justify-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        emailSuccess
                          ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                          : emailSending || !emailForm.recipientEmail
                          ? 'bg-gray-600/30 border border-gray-500/30 text-gray-400 cursor-not-allowed'
                          : 'bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 hover:border-pink-500/30'
                      }`}
                    >
                      {emailSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : emailSuccess ? (
                        <>
                          <FaCheck className="w-5 h-5" />
                          <span>Email Sent!</span>
                        </>
                      ) : (
                        <>
                          <FaEnvelope className="w-5 h-5" />
                          <span>Send Invitation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                <p className="text-pink-300 text-sm">
                  💡 Share the room URL with your team members to collaborate in real-time!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaCopy, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const BACKEND_URL = import.meta.env.PROD
  ? 'https://devaura-3l4q.onrender.com'
  : 'https://devaura-3l4q.onrender.com';

const ShareModal = ({ showShareModal, setShowShareModal, roomId, username }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailForm, setEmailForm] = useState({
    recipientEmail: '',
    recipientName: '',
    message: ''
  });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleCopyRoomId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy room ID:', error);
      const textArea = document.createElement('textarea');
      textArea.value = roomId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [roomId]);

  const handleShareViaEmail = useCallback(async () => {
    if (!emailForm.recipientEmail) {
      alert('Please enter recipient email address');
      return;
    }

    setEmailSending(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/email/share-room`, {
        recipientEmail: emailForm.recipientEmail,
        recipientName: emailForm.recipientName,
        senderName: username,
        roomId: roomId,
        message: emailForm.message
      });

      if (response.data.success) {
        setEmailSuccess(true);
        setEmailForm({ recipientEmail: '', recipientName: '', message: '' });
        setTimeout(() => {
          setEmailSuccess(false);
          setShowShareModal(false);
        }, 2000);
      } else {
        alert(response.data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(error.response?.data?.message || 'Failed to send email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  }, [emailForm, roomId, username, setShowShareModal]);

  return (
    <AnimatePresence>
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
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
                  <FaShare className="text-pink-400" />
                  Share Room
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-white/50 hover:text-white/80 transition-colors p-1"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Room ID Display */}
              <div className="mb-6 p-4 bg-black/30 rounded-lg border border-gray-700/30">
                <p className="text-sm text-gray-400 mb-2">Room ID</p>
                <p className="text-white font-mono text-sm break-all">{roomId}</p>
              </div>

              {/* Share Options */}
              <div className="space-y-4">
                <button
                  onClick={handleCopyRoomId}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50 transition-all duration-300"
                >
                  {copySuccess ? <FaCheck className="w-5 h-5" /> : <FaCopy className="w-5 h-5" />}
                  <span>
                    {copySuccess ? 'Copied to Clipboard!' : 'Copy Room ID'}
                  </span>
                </button>

                {/* Email Sharing Form */}
                <div className="border border-gray-700/30 rounded-lg p-4 bg-black/20">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4" />
                    Send Email Invitation
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <input
                        type="email"
                        placeholder="Recipient's email address *"
                        value={emailForm.recipientEmail}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, recipientEmail: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Recipient's name (optional)"
                        value={emailForm.recipientName}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, recipientName: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Personal message (optional)"
                        value={emailForm.message}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/30 resize-none"
                      />
                    </div>

                    <button
                      onClick={handleShareViaEmail}
                      disabled={emailSending || !emailForm.recipientEmail}
                      className={`w-full flex items-center justify-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        emailSuccess
                          ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                          : emailSending || !emailForm.recipientEmail
                          ? 'bg-gray-600/30 border border-gray-500/30 text-gray-400 cursor-not-allowed'
                          : 'bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 hover:border-pink-500/30'
                      }`}
                    >
                      {emailSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : emailSuccess ? (
                        <>
                          <FaCheck className="w-5 h-5" />
                          <span>Email Sent!</span>
                        </>
                      ) : (
                        <>
                          <FaEnvelope className="w-5 h-5" />
                          <span>Send Invitation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                <p className="text-pink-300 text-sm">
                  💡 Share the room URL with your team members to collaborate in real-time!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;