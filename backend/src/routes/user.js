const Joi = require('@hapi/joi');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController');
const { verifyToken, requireRole } = require('../middleware/auth');

module.exports = [
  {
    method: 'GET',
    path: '/users/profile',
    options: {
      pre: [verifyToken],
      handler: getProfile,
      description: 'Get user profile',
      tags: ['api', 'user']
    }
  },
  {
    method: 'PUT',
    path: '/users/profile',
    options: {
      pre: [verifyToken],
      handler: updateProfile,
      validate: {
        payload: Joi.object({
          username: Joi.string().min(3).max(30),
          email: Joi.string().email()
        })
      },
      description: 'Update user profile',
      tags: ['api', 'user']
    }
  },
  {
    method: 'GET',
    path: '/users',
    options: {
      pre: [verifyToken, requireRole('admin')],
      handler: getAllUsers,
      description: 'Get all users (admin)',
      tags: ['api', 'user']
    }
  }
]; 