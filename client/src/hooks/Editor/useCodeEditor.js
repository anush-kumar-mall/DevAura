import { useCallback } from 'react';

export const useCodeEditor = ({ currentFile, code, roomId, socketRef, setCode, setFiles, saveToServer }) => {
  const handleCodeChanges = useCallback((value) => {
    if (!currentFile || !socketRef.current) return;
    setCode(value);
    setFiles(prev => ({ ...prev, [currentFile]: value }));
    socketRef.current.emit('file-content-change', { roomId, fileName: currentFile, content: value });
    saveToServer(currentFile, value);
  }, [currentFile, roomId, socketRef, saveToServer]);

  const handleCodeInsert = useCallback((codeToInsert) => {
    if (!currentFile) return alert('Please select a file first.');
    const separator = code?.trim() ? '\n\n' : '';
    handleCodeChanges((code || '') + separator + codeToInsert);
  }, [currentFile, code, handleCodeChanges]);

  return { handleCodeChanges, handleCodeInsert };
};