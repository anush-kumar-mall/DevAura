import ShareModal from './ShareModal';
import AuthPromptModal from './AuthPromptModal';
import UsageWarningToast from './UsageWarningToast';
import AuthModal from '../AuthModal';

const EditorModals = ({
  showShareModal, setShowShareModal,
  showAuthModal, setShowAuthModal,
  showUsageWarning, usageCount,
  roomId, username,
  onAuth,
}) => (
  <>
    <ShareModal
      showShareModal={showShareModal}
      setShowShareModal={setShowShareModal}
      roomId={roomId}
      username={username}
    />
    <AuthPromptModal
      showAuthModal={showAuthModal}
      setShowAuthModal={setShowAuthModal}
    />
    <UsageWarningToast
      showUsageWarning={showUsageWarning}
      usageCount={usageCount}
    />
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      onAuth={onAuth}
    />
  </>
);

export default EditorModals;