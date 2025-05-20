const User = require('../models/User');
const Boom = require('@hapi/boom');

const getProfile = async (request, h) => {
  try {
    const user = await User.findById(request.auth.user.id).select('-password');
    if (!user) throw Boom.notFound('User tidak ditemukan');
    return h.response({ status: 'success', data: user });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const updateProfile = async (request, h) => {
  try {
    const { username, email } = request.payload;
    const user = await User.findByIdAndUpdate(
      request.auth.user.id,
      { username, email },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');
    if (!user) throw Boom.notFound('User tidak ditemukan');
    return h.response({ status: 'success', data: user });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const getAllUsers = async (request, h) => {
  try {
    const users = await User.find().select('-password');
    return h.response({ status: 'success', data: users });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

module.exports = { getProfile, updateProfile, getAllUsers }; 