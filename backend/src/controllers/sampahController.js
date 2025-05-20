const Sampah = require('../models/Sampah');
const User = require('../models/User');
const Boom = require('@hapi/boom');

const createSampah = async (request, h) => {
  try {
    const { jenis, foto, jumlah, estimasiPoin, metode, lokasi, tanggal } = request.payload;
    const sampah = new Sampah({
      user: request.auth.user.id,
      jenis,
      foto,
      jumlah,
      estimasiPoin,
      metode,
      lokasi,
      tanggal
    });
    await sampah.save();
    return h.response({ status: 'success', data: sampah }).code(201);
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const listUserSampah = async (request, h) => {
  try {
    const data = await Sampah.find({ user: request.auth.user.id });
    return h.response({ status: 'success', data });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const listAllSampah = async (request, h) => {
  try {
    const data = await Sampah.find().populate('user', 'username email');
    return h.response({ status: 'success', data });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const updateStatusSampah = async (request, h) => {
  try {
    const { id } = request.params;
    const { status } = request.payload;
    const sampah = await Sampah.findByIdAndUpdate(id, { status }, { new: true });
    if (!sampah) throw Boom.notFound('Data sampah tidak ditemukan');
    // Jika status approved, tambahkan poin ke user
    if (status === 'approved') {
      await User.findByIdAndUpdate(sampah.user, { $inc: { poin: sampah.estimasiPoin } });
    }
    return h.response({ status: 'success', data: sampah });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

module.exports = { createSampah, listUserSampah, listAllSampah, updateStatusSampah }; 