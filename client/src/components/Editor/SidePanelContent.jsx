import { FaFolder, FaUsers, FaPaintBrush, FaComments, FaRobot } from 'react-icons/fa';
import FileExplorer from '../FileManager';
import UserList from '../UserList';
import ChatBox from '../ChatBox';
import CopilotPanel from '../Copilot/CopilotPanel';

const panelConfig = {
  files: { title: 'File Explorer', icon: FaFolder, color: 'blue' },
  users: { title: 'Active Users', icon: FaUsers, color: 'green' },
  draw: { title: 'Whiteboard', icon: FaPaintBrush, color: 'purple' },
  chat: { title: 'Code Chat', icon: FaComments, color: 'pink' },
  copilot: { title: 'AI Assistant', icon: FaRobot, color: 'purple' }
};

const SidePanelContent = ({
  activeTab,
  files,
  currentFile,
  users,
  socketRef,
  roomId,
  username,
  code,
  onFileClick,
  onAdd,
  onRename,
  onDelete,
  onCodeInsert,
  onMessageReceived,
  setUnreadCount,
}) => {
  const config = panelConfig[activeTab];
  if (!config) return null;

  const IconComponent = config.icon;

  const colorClass = {
    pink: { icon: 'text-pink-400', dot: 'bg-pink-500' },
    purple: { icon: 'text-purple-400', dot: 'bg-purple-500' },
    blue: { icon: 'text-blue-400', dot: 'bg-blue-500' },
    green: { icon: 'text-green-400', dot: 'bg-green-500' },
  }[config.color];

  return (
    <div className="h-full flex flex-col">
      {/* Minimal Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/30 bg-pink-500/5">
        <div className="flex items-center gap-3">
          <IconComponent className={`w-4 h-4 ${colorClass.icon}`} />
          <div>
            <span className="font-medium text-white text-sm">{config.title}</span>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${colorClass.dot} animate-pulse`}></div>
              <span className="text-xs text-gray-400">
                {activeTab === 'users' ? `${users.length} online` : 'Live'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden p-1">
        {activeTab === 'files' && (
          <div className="h-full bg-black/20 backdrop-blur-xl border border-pink-500/20 rounded-xl overflow-hidden">
            <FileExplorer
              fileTree={Object.keys(files).map((name) => ({
                name,
                type: 'file',
                content: files[name]
              }))}
              currentFile={currentFile}
              onFileClick={onFileClick}
              onAdd={onAdd}
              onRename={onRename}
              onDelete={onDelete}
              className="h-full p-4"
            />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="h-full bg-black/20 backdrop-blur-xl border border-pink-500/20 rounded-xl overflow-hidden">
            <UserList
              users={users}
              currentUser={username}
              className="h-full p-4"
            />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-full bg-black/20 backdrop-blur-xl border border-pink-500/20 rounded-xl overflow-hidden">
            <div className="h-full flex flex-col">
              <ChatBox
                socket={socketRef.current}
                roomId={roomId}
                username={username}
                onMessageReceived={() => {
                  if (activeTab === 'chat') {
                    setUnreadCount(0);
                  }
                }}
                className="h-full"
              />
            </div>
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="h-full bg-black/20 backdrop-blur-xl border border-pink-500/20 rounded-xl overflow-hidden">
            <CopilotPanel
              currentFile={currentFile}
              code={code}
              onCodeInsert={onCodeInsert}
              roomId={roomId}
              className="h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanelContent;