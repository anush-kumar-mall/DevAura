
import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { getTemplateForFile } from '../../utils/codeTemplates';

const BACKEND_URL = 'https://devaura-3l4q.onrender.com';

export const useFileManager = ({ roomId, socketRef }) => {
  const [files, setFiles] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [code, setCode] = useState('');

  const debouncedSaveRef = useRef(null);

  // Debounced save to server
  useEffect(() => {
    debouncedSaveRef.current = _.debounce(async (fileName, content) => {
      if (!fileName || !roomId) return;

      try {
        await axios.post(`${BACKEND_URL}/api/files/${roomId}`, {
          name: fileName,
          content,
        });

        socketRef?.current?.emit('file-updated', {
          roomId,
          fileName,
          content,
        });
      } catch (err) {
        console.error('Error saving file:', err);
      }
    }, 1000);

    return () => {
      debouncedSaveRef.current?.cancel();
    };
  }, [roomId, socketRef]);

  const saveToServer = useCallback((fileName, content) => {
    debouncedSaveRef.current?.(fileName, content);
  }, []);

  // Fetch all files
  const fetchFiles = useCallback(async () => {
    if (!roomId) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/api/files/${roomId}`);
      const filesData = {};

      res.data.files.forEach((file) => {
        filesData[file.fileName] = file.content;
      });

      setFiles(filesData);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  }, [roomId]);

  // Open a file
  const handleFileClick = useCallback(async (fileName) => {
    if (!fileName || !roomId) return;

    try {
      let content = files[fileName];

      if (content === undefined) {
        const res = await axios.get(
          `${BACKEND_URL}/api/files/${roomId}/${encodeURIComponent(fileName)}`
        );

        content = res.data.content ?? '';
        setFiles((prev) => ({
          ...prev,
          [fileName]: content,
        }));
      }

      setCurrentFile(fileName);
      setCode(content ?? '');
      localStorage.setItem('lastOpenedFile', fileName);
    } catch (err) {
      console.error('Error opening file:', err);
    }
  }, [files, roomId]);

  // Create a file
  const handleAddNode = useCallback(async (
    fileName,
    type = 'file',
    retryCount = 0
  ) => {
    const trimmedName = fileName?.trim();

    if (!roomId || !trimmedName) {
      alert(!roomId ? '❌ No room ID found.' : '❌ Enter a valid filename.');
      return;
    }

    try {
      const template = getTemplateForFile(trimmedName);

      const res = await axios.post(
        `${BACKEND_URL}/api/files/${roomId}`,
        {
          name: trimmedName,
          content: template,
          roomId,
        },
        { timeout: 35000 }
      );

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'File creation failed.');
      }

      const fileContent = res.data.content ?? template;

      setFiles((prev) => ({
        ...prev,
        [trimmedName]: fileContent,
      }));

      // Socket ref may not be available yet.
      socketRef?.current?.emit('file-created', {
        roomId,
        fileName: trimmedName,
        content: fileContent,
      });

      setCurrentFile(trimmedName);
      setCode(fileContent);
      localStorage.setItem('lastOpenedFile', trimmedName);

      // alert(`✅ File "${trimmedName}" created successfully!`);
    } catch (error) {
      console.error('Error creating file:', error);

      const isTimeout =
        error.code === 'ECONNABORTED' ||
        error.message?.toLowerCase().includes('timeout');

      const message = isTimeout
        ? '⏱️ Request timed out. Try again?'
        : `🚫 ${error.response?.data?.message || error.message}`;

      if (
        retryCount < 2 &&
        window.confirm(`${message}\n\nRetry? (${retryCount + 1}/3)`)
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 + retryCount * 1000)
        );

        return handleAddNode(trimmedName, type, retryCount + 1);
      }

      alert(
        retryCount >= 2
          ? '❌ Failed after 3 attempts.'
          : message
      );
    }
  }, [roomId, socketRef]);

  // Delete a file
  const handleDeleteNode = useCallback(async (fileName) => {
    if (!fileName || !roomId) return;

    try {
      await axios.delete(
        `${BACKEND_URL}/api/files/${roomId}/${encodeURIComponent(fileName)}`
      );

      setFiles((prev) => {
        const updated = { ...prev };
        delete updated[fileName];
        return updated;
      });

      if (currentFile === fileName) {
        setCurrentFile(null);
        setCode('');
        localStorage.removeItem('lastOpenedFile');
      }
    } catch (err) {
      console.error('Error deleting file:', err);
      alert(`Failed to delete: ${err.message}`);
      await fetchFiles();
    }
  }, [roomId, currentFile, fetchFiles]);

  // Rename a file
  const handleRenameNode = useCallback(async (oldName, newName) => {
    const trimmedName = newName?.trim();

    if (!oldName || !trimmedName || !roomId) return;

    if (files[trimmedName] && trimmedName !== oldName) {
      alert('File already exists');
      return;
    }

    const content = files[oldName] ?? '';

    try {
      const res = await axios.post(`${BACKEND_URL}/api/files/${roomId}`, {
        name: trimmedName,
        content,
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Could not create renamed file.');
      }

      await axios.delete(
        `${BACKEND_URL}/api/files/${roomId}/${encodeURIComponent(oldName)}`
      );

      setFiles((prev) => {
        const updated = { ...prev };
        delete updated[oldName];
        updated[trimmedName] = content;
        return updated;
      });

      if (currentFile === oldName) {
        setCurrentFile(trimmedName);
        localStorage.setItem('lastOpenedFile', trimmedName);
      }
    } catch (err) {
      console.error('Rename error:', err);
      alert(`Rename failed: ${err.message}`);
      await fetchFiles();
    }
  }, [roomId, files, currentFile, fetchFiles]);

  // Apply changes received from other users
  const applyFileUpdate = useCallback((fileName, content) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: content,
    }));

    setCurrentFile((prev) => {
      if (prev === fileName) {
        setCode(content);
      }
      return prev;
    });
  }, []);

  // Apply file deletion received from other users
  const applyFileDeleted = useCallback((fileName) => {
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });

    setCurrentFile((prev) => {
      if (prev === fileName) {
        setCode('');
        localStorage.removeItem('lastOpenedFile');
        return null;
      }
      return prev;
    });
  }, []);

  // Fetch files when room changes
  useEffect(() => {
    if (roomId) {
      fetchFiles();
    }
  }, [roomId, fetchFiles]);

  // Restore last opened file when available
  useEffect(() => {
    const last = localStorage.getItem('lastOpenedFile');

    if (last && Object.prototype.hasOwnProperty.call(files, last)) {
      if (currentFile !== last) {
        handleFileClick(last);
      }
    }
  }, [files, currentFile, handleFileClick]);

  return {
    files,
    setFiles,
    currentFile,
    code,
    setCode,
    saveToServer,
    fetchFiles,
    handleFileClick,
    handleAddNode,
    handleDeleteNode,
    handleRenameNode,
    applyFileUpdate,
    applyFileDeleted,
  };
};
