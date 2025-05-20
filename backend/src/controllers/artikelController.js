const Artikel = require('../models/Artikel');
const Boom = require('@hapi/boom');

const createArtikel = async (request, h) => {
  try {
    const { judul, isi, tanggal } = request.payload;
    const artikel = new Artikel({
      judul,
      isi,
      author: request.auth.user.id,
      tanggal
    });
    await artikel.save();
    return h.response({ status: 'success', data: artikel }).code(201);
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const listArtikel = async (request, h) => {
  try {
    const data = await Artikel.find().populate('author', 'username');
    return h.response({ status: 'success', data });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const getArtikel = async (request, h) => {
  try {
    const { id } = request.params;
    const artikel = await Artikel.findById(id).populate('author', 'username');
    if (!artikel) throw Boom.notFound('Artikel tidak ditemukan');
    return h.response({ status: 'success', data: artikel });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const updateArtikel = async (request, h) => {
  try {
    const { id } = request.params;
    const { judul, isi, tanggal } = request.payload;
    const artikel = await Artikel.findByIdAndUpdate(id, { judul, isi, tanggal }, { new: true });
    if (!artikel) throw Boom.notFound('Artikel tidak ditemukan');
    return h.response({ status: 'success', data: artikel });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

const deleteArtikel = async (request, h) => {
  try {
    const { id } = request.params;
    const artikel = await Artikel.findByIdAndDelete(id);
    if (!artikel) throw Boom.notFound('Artikel tidak ditemukan');
    return h.response({ status: 'success', message: 'Artikel dihapus' });
  } catch (err) {
    throw Boom.badImplementation(err);
  }
};

module.exports = { createArtikel, listArtikel, getArtikel, updateArtikel, deleteArtikel }; 