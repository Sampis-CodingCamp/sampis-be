const Joi = require('@hapi/joi');
const authController = require('../controllers/authController');

const routes = [
  {
    method: 'POST',
    path: '/auth/register',
    options: {
      handler: authController.register,
      validate: {
        payload: Joi.object({
          username: Joi.string().required().min(3).max(30),
          email: Joi.string().required().email(),
          password: Joi.string().required().min(6)
        })
      },
      description: 'Register user baru',
      tags: ['api', 'auth'],
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    options: {
      handler: authController.login,
      validate: {
        payload: Joi.object({
          email: Joi.string().required().email(),
          password: Joi.string().required()
        })
      },
      description: 'Login user',
      tags: ['api', 'auth'],
      auth: false
    }
  }
];

module.exports = routes; 