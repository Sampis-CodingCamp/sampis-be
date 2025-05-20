const User = require('../models/User');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '24h' }
  );
};

const register = async (request, h) => {
  try {
    const { username, email, password } = request.payload;

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw Boom.conflict('Email atau username sudah terdaftar');
    }

    // Buat user baru
    const user = new User({
      username,
      email,
      password
    });
    await user.save();

    // Generate token
    const token = generateToken(user);

    return h.response({
      status: 'success',
      message: 'Registrasi berhasil',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    }).code(201);
  } catch (error) {
    throw Boom.badImplementation(error);
  }
};

const login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    // Cari user
    const user = await User.findOne({ email });
    if (!user) {
      throw Boom.unauthorized('Email atau password salah');
    }

    // Verifikasi password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw Boom.unauthorized('Email atau password salah');
    }

    // Generate token
    const token = generateToken(user);

    return h.response({
      status: 'success',
      message: 'Login berhasil',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    throw Boom.badImplementation(error);
  }
};

module.exports = {
  register,
  login
}; 