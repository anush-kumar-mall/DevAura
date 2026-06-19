import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { getTemplateForFile } from '../../utils/codeTemplates';

const BACKEND_URL = import.meta.env.PROD
  ? 'https://s65-nishat-capstone-codeunity-swbt.onrender.com'
  : 'http://localhost:8080';

export const useFileManager = ({ roomId, socketRef }) => {
  const [files, setFiles] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [code, setCode] = useState('');

  const debouncedSaveRef = useRef();

  useEffect(() => {
    debouncedSaveRef.current = _.debounce(async (fileName, content) => {
      if (!fileName || !roomId) return;
      try {
        await axios.post(`${BACKEND_URL}/api/files/${roomId}`, { name: fileName, content });
        socketRef.current?.emit('file-updated', { roomId, fileName, content });
      } catch (err) {
        console.error('Error saving file:', err);
      }
    }, 1000);

    return () => debouncedSaveRef.current?.cancel();
  }, [roomId]);

  const saveToServer = useCallback((fileName, content) => {
    debouncedSaveRef.current?.(fileName, content);
  }, []);

  const fetchFiles = useCallback(async () => {
    if (!roomId) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/api/files/${roomId}`);
      const filesData = {};
      res.data.files.forEach(f => { filesData[f.fileName] = f.content; });
      setFiles(filesData);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  }, [roomId]);

  const handleFileClick = useCallback(async (fileName) => {
    try {
      let content = files[fileName];
      if (!content) {
        const res = await axios.get(`${BACKEND_URL}/api/files/${roomId}/${fileName}`);
        content = res.data.content;
        setFiles(prev => ({ ...prev, [fileName]: content }));
      }
      setCurrentFile(fileName);
      setCode(content);
      localStorage.setItem('lastOpenedFile', fileName);
    } catch (err) {
      console.error('Error opening file:', err);
    }
  }, [files, roomId]);

  const handleAddNode = useCallback(async (fileName, type = 'file', retryCount = 0) => {
    if (!roomId || !fileName?.trim()) {
      alert(!roomId ? '❌ No room ID found.' : '❌ Enter a valid filename.');
      return;
    }
    try {
      const template = getTemplateForFile(fileName);
      const res = await axios.post(`${BACKEND_URL}/api/files/${roomId}`, {
        name: fileName, content: template, roomId
      }, { timeout: 35000 });

      if (res.data.success) {
        const fileContent = res.data.content || template;
        setFiles(prev => ({ ...prev, [fileName]: fileContent }));
        socketRef.current?.emit('file-created', { roomId, fileName, content: fileContent });
        setCurrentFile(fileName);
        setCode(fileContent);
        alert(`✅ File "${fileName}" created successfully!`);
      }
    } catch (error) {
      console.error('Error creating file:', error);
      const isTimeout = error.code === 'ECONNABORTED' || error.message.includes('timeout');
      const msg = isTimeout
        ? '⏱️ Request timed out. Try again?'
        : `🚫 ${error.response?.data?.message || error.message}`;
      if (retryCount < 2 && confirm(`${msg}\n\nRetry? (${retryCount + 1}/3)`)) {
        await new Promise(r => setTimeout(r, 2000 + retryCount * 1000));
        return handleAddNode(fileName, type, retryCount + 1);
      }
      alert(retryCount >= 2 ? '❌ Failed after 3 attempts.' : msg);
    }
  }, [roomId, socketRef]);

  const handleDeleteNode = useCallback(async (fileName) => {
    if (!fileName || !roomId) return;
    setFiles(prev => { const n = { ...prev }; delete n[fileName]; return n; });
    if (currentFile === fileName) {
      setCurrentFile(null);
      setCode('');
      localStorage.removeItem('lastOpenedFile');
    }
    try {
      await axios.delete(`${BACKEND_URL}/api/files/${roomId}/${fileName}`);
    } catch (err) {
      console.error('Error deleting file:', err);
      alert(`Failed to delete: ${err.message}`);
      fetchFiles();
    }
  }, [roomId, currentFile, fetchFiles]);

  const handleRenameNode = useCallback(async (oldName, newName) => {
    if (!oldName || !newName?.trim() || !roomId) return;
    if (files[newName] && newName !== oldName) return alert('File already exists');

    const content = files[oldName] || '';
    setFiles(prev => { const n = { ...prev }; delete n[oldName]; n[newName] = content; return n; });
    if (currentFile === oldName) {
      setCurrentFile(newName);
      localStorage.setItem('lastOpenedFile', newName);
    }
    try {
      const res = await axios.post(`${BACKEND_URL}/api/files/${roomId}`, { name: newName, content });
      if (res.data.success) await axios.delete(`${BACKEND_URL}/api/files/${roomId}/${oldName}`);
    } catch (err) {
      console.error('Rename error:', err);
      alert(`Rename failed: ${err.message}`);
      fetchFiles();
    }
  }, [roomId, files, currentFile, fetchFiles]);

  // Sync external socket changes
  const applyFileUpdate = useCallback((fileName, content) => {
    setFiles(prev => ({ ...prev, [fileName]: content }));
    setCurrentFile(prev => {
      if (prev === fileName) setCode(content);
      return prev;
    });
  }, []);

  const applyFileDeleted = useCallback((fileName) => {
    setFiles(prev => { const n = { ...prev }; delete n[fileName]; return n; });
    setCurrentFile(prev => prev === fileName ? null : prev);
    if (localStorage.getItem('lastOpenedFile') === fileName) localStorage.removeItem('lastOpenedFile');
  }, []);

  useEffect(() => { if (roomId) fetchFiles(); }, [roomId, fetchFiles]);

  useEffect(() => {
    const last = localStorage.getItem('lastOpenedFile');
    if (last && files[last]) handleFileClick(last);
  }, [files, handleFileClick]);

  return {
    files, setFiles, currentFile, code, setCode,
    saveToServer, fetchFiles,
    handleFileClick, handleAddNode, handleDeleteNode, handleRenameNode,
    applyFileUpdate, applyFileDeleted,
  };
};