const authRoutes = require('./auth');
const userRoutes = require('./user');
const sampahRoutes = require('./sampah');
const artikelRoutes = require('./artikel');
const poinRoutes = require('./poin');

const routes = [
  ...authRoutes,
  ...userRoutes,
  ...sampahRoutes,
  ...artikelRoutes,
  ...poinRoutes
];

module.exports = routes; 