import MonacoEditor from '@monaco-editor/react';
import TldrawWithRealtime from '../TldrawWithRealtime';
import CodeRunner from '../CodeExecution/CodeRunner';
import EditorHeader from './EditorHeader';

const getLanguageFromFileName = (fileName) => {
  const ext = fileName?.split('.').pop().toLowerCase();
  return {
    js: 'javascript', py: 'python', java: 'java', cpp: 'cpp',
    c: 'c', ts: 'typescript', go: 'go', rb: 'ruby', php: 'php',
    rs: 'rust', kt: 'kotlin', swift: 'swift', md: 'markdown', txt: 'plaintext',
  }[ext] || 'plaintext';
};

const MONACO_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  automaticLayout: true,
  padding: { top: 20, bottom: 20, left: 20, right: 20 },
  scrollbar: {
    vertical: 'visible', horizontal: 'visible',
    useShadows: false, verticalScrollbarSize: 8, horizontalScrollbarSize: 8,
  },
  lineHeight: 1.6,
  letterSpacing: 0.5,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  smoothScrolling: true,
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: true,
  renderWhitespace: 'none',
  glyphMargin: false,
  renderLineHighlight: 'all',
  contextmenu: true,
  mouseWheelZoom: true,
  quickSuggestions: true,
  roundedSelection: true,
  wordWrap: 'on',
  bracketPairColorization: { enabled: true },
  guides: { bracketPairs: true, indentation: true },
};

const EditorMainArea = ({
  activeTab, currentFile, code,
  socketRef, roomId,
  user, usageCount, isLimitReached, isAuthenticated,
  onLogout, onShowAuthModal, onDownloadProject, onShowShareModal,
  onRunCode, onCodeChange,
}) => (
  <div className="flex-1 flex flex-col bg-black/20 backdrop-blur-xl border-2 border-pink-500/40 rounded-2xl overflow-hidden shadow-xl shadow-pink-500/10">
    <EditorHeader
      activeTab={activeTab}
      currentFile={currentFile}
      user={user}
      usageCount={usageCount}
      isLimitReached={isLimitReached}
      isAuthenticated={isAuthenticated}
      onLogout={onLogout}
      onShowAuthModal={onShowAuthModal}
      onDownloadProject={onDownloadProject}
      onShowShareModal={onShowShareModal}
    />

    <div className="flex-1 p-4">
      {activeTab === 'draw' ? (
        <div className="h-full rounded-lg border-2 border-pink-500/40 overflow-hidden bg-black/30 backdrop-blur-sm shadow-lg shadow-pink-500/10">
          <TldrawWithRealtime
            socket={socketRef.current}
            roomId={roomId}
            isPersistent={true}
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="h-full rounded-lg border-2 border-pink-500/40 overflow-hidden bg-black/30 backdrop-blur-sm shadow-lg shadow-pink-500/10">
          <CodeRunner currentFile={currentFile} code={code} onRunCode={onRunCode}>
            <MonacoEditor
              height="100%"
              language={getLanguageFromFileName(currentFile)}
              theme="vs-dark"
              defaultValue={code}
              onChange={(value) => { if (value !== code) onCodeChange(value); }}
              options={MONACO_OPTIONS}
              key={currentFile}
            />
          </CodeRunner>
        </div>
      )}
    </div>
  </div>
);

export default EditorMainArea;