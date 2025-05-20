const Joi = require('@hapi/joi');
const { createArtikel, listArtikel, getArtikel, updateArtikel, deleteArtikel } = require('../controllers/artikelController');
const { verifyToken, requireRole } = require('../middleware/auth');

module.exports = [
  {
    method: 'POST',
    path: '/artikel',
    options: {
      pre: [verifyToken, requireRole('admin')],
      handler: createArtikel,
      validate: {
        payload: Joi.object({
          judul: Joi.string().required(),
          isi: Joi.string().required(),
          tanggal: Joi.date().required()
        })
      },
      description: 'Create artikel (admin)',
      tags: ['api', 'artikel']
    }
  },
  {
    method: 'GET',
    path: '/artikel',
    options: {
      handler: listArtikel,
      description: 'List artikel',
      tags: ['api', 'artikel']
    }
  },
  {
    method: 'GET',
    path: '/artikel/{id}',
    options: {
      handler: getArtikel,
      description: 'Detail artikel',
      tags: ['api', 'artikel']
    }
  },
  {
    method: 'PUT',
    path: '/artikel/{id}',
    options: {
      pre: [verifyToken, requireRole('admin')],
      handler: updateArtikel,
      validate: {
        payload: Joi.object({
          judul: Joi.string().required(),
          isi: Joi.string().required(),
          tanggal: Joi.date().required()
        })
      },
      description: 'Update artikel (admin)',
      tags: ['api', 'artikel']
    }
  },
  {
    method: 'DELETE',
    path: '/artikel/{id}',
    options: {
      pre: [verifyToken, requireRole('admin')],
      handler: deleteArtikel,
      description: 'Delete artikel (admin)',
      tags: ['api', 'artikel']
    }
  }
]; 