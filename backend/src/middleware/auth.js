const jwt = require('jsonwebtoken');
const config = require('../config');
const Boom = require('@hapi/boom');

const verifyToken = async (request, h) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Boom.unauthorized('Token tidak ditemukan');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    request.auth = { user: decoded };
    return h.continue;
  } catch (err) {
    throw Boom.unauthorized('Token tidak valid');
  }
};

const requireRole = (role) => {
  return async (request, h) => {
    if (!request.auth || !request.auth.user || request.auth.user.role !== role) {
      throw Boom.forbidden('Akses ditolak');
    }
    return h.continue;
  };
};

module.exports = { verifyToken, requireRole }; 