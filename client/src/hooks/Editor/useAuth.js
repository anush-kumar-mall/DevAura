import axios from 'axios';

const BACKEND_URL = import.meta.env.PROD
  ? 'https://devaura-3l4q.onrender.com'
  : 'https://devaura-3l4q.onrender.com';

export const useAuth = ({ setUserAuth, roomId }) => {
  const handleAuth = async (userData) => {
    setUserAuth(userData);
    if (!userData || !roomId) return;
    try {
      const token = localStorage.getItem('codeunity_token');
      await axios.post(
        `${BACKEND_URL}/api/auth/room-history`,
        { roomId, roomName: roomId, role: 'participant' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Error adding room to history:', err);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('codeunity_token');
      if (token) {
        await axios.post(
          `${BACKEND_URL}/api/auth/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('codeunity_user');
      localStorage.removeItem('codeunity_token');
      setUserAuth(null);
    }
  };

  return { handleAuth, handleLogout };
};