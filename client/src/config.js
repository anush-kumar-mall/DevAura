const config = {
  backendUrl: import.meta.env.PROD 
    ? 'https://devaura-3l4q.onrender.com'
    : 'https://devaura-3l4q.onrender.com',
  frontendUrl: import.meta.env.PROD
    ? 'https://cunity.vercel.app'
    : 'http://localhost:5173'
};

export default config;
