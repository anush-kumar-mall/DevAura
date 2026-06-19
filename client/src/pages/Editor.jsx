import { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import Sidebar from '../components/Sidebar';
import MobileError from '../components/MobileError.jsx';
import EditorMainArea from '../components/Editor/EditorMainArea';
import EditorModals from '../components/Editor/EditorModals';
import SidePanelContent from '../components/Editor/SidePanelContent';
import DrawChatPanel from '../components/Editor/DrawChatPanel';
import { useNotifications } from '../components/NotificationToast';

import { useUsageTracking } from '../hooks/Editor/useUsageTracking';
import { useSocket } from '../hooks/Editor/useSocket';
import { useFileManager } from '../hooks/Editor/useFileManager';
import { useCodeEditor } from '../hooks/Editor/useCodeEditor';
import { useCodeExecution } from '../hooks/Editor/useCodeExecution';
import { useProjectDownload } from '../hooks/Editor/useProjectDownload';
import { useMobile } from '../hooks/Editor/useMobile';
import { useAuth } from '../hooks/Editor/useAuth';
import { useEditorUIEffects } from '../hooks/Editor/useEditorUIEffects';

const Editor = () => {
  const { roomId } = useParams();
  const { state } = useLocation();

  const [activeTab, setActiveTab] = useState('files');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUsageWarning, setShowUsageWarning] = useState(false);
  const activeTabRef = useRef(activeTab);

  const { NotificationContainer } = useNotifications();
  const { usageCount, isLimitReached, user, incrementUsage, setUserAuth, isAuthenticated } = useUsageTracking();
  const isMobile = useMobile();

  const {
    files, setFiles, currentFile, code, setCode, saveToServer,
    handleFileClick, handleAddNode, handleDeleteNode, handleRenameNode,
    applyFileUpdate, applyFileDeleted,
  } = useFileManager({ roomId });

  const { socketRef, users, unreadCount, setUnreadCount } = useSocket({
    roomId,
    username: state?.username,
    activeTabRef,
    onFilesUpdated: setFiles,
    onFileCreated: (name, content) => setFiles(prev => ({ ...prev, [name]: content })),
    onFileDeleted: applyFileDeleted,
    onFileContentChange: applyFileUpdate,
  });

  const { handleCodeChanges, handleCodeInsert } = useCodeEditor({
    currentFile, code, roomId, socketRef, setCode, setFiles, saveToServer,
  });

  const { handleRunCode } = useCodeExecution({
    currentFile, code, roomId, socketRef,
    isAuthenticated, incrementUsage, usageCount,
    setShowAuthModal, setShowUsageWarning,
  });

  const { handleDownloadProject } = useProjectDownload({ files, roomId });

  const { handleAuth, handleLogout } = useAuth({ setUserAuth, roomId });

  useEditorUIEffects({ activeTab, activeTabRef, setUnreadCount, setShowShareModal });

  if (isMobile) return <MobileError />;

  return (
    <div className="h-screen overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-3xl transform rotate-45 animate-pulse" />
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-2xl transform -rotate-12 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-400/10 to-purple-500/10 rounded-xl transform rotate-12 animate-pulse delay-2000" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent transform rotate-12 origin-left" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -rotate-12 origin-right" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-radial from-pink-500/5 via-pink-500/2 to-transparent rounded-full" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-radial from-purple-500/5 via-purple-500/2 to-transparent rounded-full" />
      </div>

      <div className="relative flex h-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-16 bg-black/80 backdrop-blur-xl border-r border-gray-800/50"
        >
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            unreadCount={unreadCount}
            onAuthRequired={() => setShowAuthModal(true)}
          />
        </motion.div>

        <div className="flex-1 flex p-4 gap-4">
          {activeTab !== 'draw' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-80 bg-black/30 backdrop-blur-xl border-2 border-pink-500/40 rounded-2xl overflow-hidden shadow-xl shadow-pink-500/10"
            >
              <div className="h-full overflow-y-auto">
                <SidePanelContent
                  activeTab={activeTab}
                  files={files}
                  currentFile={currentFile}
                  users={users}
                  socketRef={socketRef}
                  roomId={roomId}
                  username={state?.username}
                  code={code}
                  onFileClick={handleFileClick}
                  onAdd={handleAddNode}
                  onRename={handleRenameNode}
                  onDelete={handleDeleteNode}
                  onCodeInsert={handleCodeInsert}
                  setUnreadCount={setUnreadCount}
                />
              </div>
            </motion.div>
          )}

          <EditorMainArea
            activeTab={activeTab}
            currentFile={currentFile}
            code={code}
            socketRef={socketRef}
            roomId={roomId}
            user={user}
            usageCount={usageCount}
            isLimitReached={isLimitReached}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            onShowAuthModal={() => setShowAuthModal(true)}
            onDownloadProject={handleDownloadProject}
            onShowShareModal={() => setShowShareModal(true)}
            onRunCode={handleRunCode}
            onCodeChange={handleCodeChanges}
          />

          {activeTab === 'draw' && (
            <DrawChatPanel
              socketRef={socketRef}
              roomId={roomId}
              username={state?.username}
              setUnreadCount={setUnreadCount}
            />
          )}
        </div>
      </div>

      <NotificationContainer />

      <EditorModals
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        showUsageWarning={showUsageWarning}
        usageCount={usageCount}
        roomId={roomId}
        username={state?.username}
        onAuth={handleAuth}
      />
    </div>
  );
};

export default Editor;