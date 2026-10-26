
const config = {
  backendUrl: import.meta.env.PROD
    ? 'https://devaura-3l4q.onrender.com'
    : 'http://localhost:8080',

  frontendUrl: import.meta.env.PROD
    ? 'https://dev-aura-virid.vercel.app'
    : 'http://localhost:5173',
};

export default config;
