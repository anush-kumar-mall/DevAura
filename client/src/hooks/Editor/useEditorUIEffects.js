import { useEffect } from 'react';

export const useEditorUIEffects = ({ activeTab, activeTabRef, setUnreadCount, setShowShareModal }) => {
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'chat' || activeTab === 'draw') setUnreadCount(0);
  }, [activeTab]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setShowShareModal(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);
};