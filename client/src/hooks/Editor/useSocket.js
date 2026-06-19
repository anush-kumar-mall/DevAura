import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.PROD
  ? 'https://s65-nishat-capstone-codeunity-swbt.onrender.com'
  : 'http://localhost:8080';

export const useSocket = ({ roomId, username, activeTabRef, onFilesUpdated, onFileCreated, onFileDeleted, onFileContentChange }) => {
  const socketRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!roomId || !username) return;

    socketRef.current = io(BACKEND_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      path: '/socket.io/',
      forceNew: false,
    });

    const socket = socketRef.current;
    socket.removeAllListeners();

    socket.on('connect', () => {
      socket.emit('join-room', { roomId, username });
    });

    socket.on('update-user-list', (userList) => {
      setUsers(userList.map(u => u.username));
    });

    socket.on('files-list-updated', ({ files }) => {
      const filesData = {};
      files.forEach(f => { filesData[f.fileName] = f.content; });
      onFilesUpdated?.(filesData);
    });

    socket.on('file-created', ({ fileName, content }) => {
      onFileCreated?.(fileName, content);
    });

    socket.on('file-deleted', ({ fileName }) => {
      onFileDeleted?.(fileName);
    });

    socket.on('file-content-change', ({ fileName, content }) => {
      onFileContentChange?.(fileName, content);
    });

    socket.on('file-updated', ({ fileName, content }) => {
      onFileContentChange?.(fileName, content);
    });

    socket.on('receive-message', () => {
      const tab = activeTabRef.current;
      if (tab !== 'chat' && tab !== 'draw') {
        setUnreadCount(prev => prev + 1);
      }
    });

    socket.on('chat-notification', () => {
      const tab = activeTabRef.current;
      if (tab !== 'chat' && tab !== 'draw') {
        setUnreadCount(prev => prev + 1);
      }
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [roomId, username]);

  return { socketRef, users, unreadCount, setUnreadCount };
};