const PenukaranPoin = require('../models/PenukaranPoin');
const User = require('../models/User');
const Boom = require('@hapi/boom');

const createPenukaran = async (request, h) => {
  try {
    const { jumlah, tanggal } = request.payload;
    const penukaran = new PenukaranPoin({
      user: request.auth.user.id,
      jumlah,
      tanggal
    });
    await penukaran.save();
    return h.response({ status: 'success', data: penukaran }).code(201);
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const listUserPenukaran = async (request, h) => {
  try {
    const data = await PenukaranPoin.find({ user: request.auth.user.id });
    return h.response({ status: 'success', data });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const listAllPenukaran = async (request, h) => {
  try {
    const data = await PenukaranPoin.find().populate('user', 'username email');
    return h.response({ status: 'success', data });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const approvePenukaran = async (request, h) => {
  try {
    const { id } = request.params;
    const { status } = request.payload;
    const penukaran = await PenukaranPoin.findByIdAndUpdate(id, { status }, { new: true });
    if (!penukaran) throw Boom.notFound('Data penukaran tidak ditemukan');
    // Jika status approved, kurangi poin user
    if (status === 'approved') {
      await User.findByIdAndUpdate(penukaran.user, { $inc: { poin: -penukaran.jumlah } });
    }
    return h.response({ status: 'success', data: penukaran });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

module.exports = { createPenukaran, listUserPenukaran, listAllPenukaran, approvePenukaran }; 