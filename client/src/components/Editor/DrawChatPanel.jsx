import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';
import ChatBox from '../ChatBox';

const DrawChatPanel = ({ socketRef, roomId, username, setUnreadCount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 bg-black/20 backdrop-blur-xl border-2 border-pink-500/40 rounded-xl overflow-hidden shadow-xl shadow-black/20"
    >
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/30 bg-pink-500/5">
          <div className="flex items-center gap-3">
            <FaComments className="w-4 h-4 text-pink-400" />
            <div>
              <span className="font-medium text-white text-sm">Code Chat</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          <ChatBox
            socket={socketRef.current}
            roomId={roomId}
            username={username}
            onMessageReceived={() => {
              setUnreadCount(0);
            }}
            className="h-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DrawChatPanel;