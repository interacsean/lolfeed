const App = {
  isDev: process.env.NODE_ENV === 'development',
  apiUri: '/api',
  adminKey: process.env.ADMIN_KEY,
};

export default App;
