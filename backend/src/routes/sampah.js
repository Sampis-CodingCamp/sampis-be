const Joi = require('@hapi/joi');
const { createSampah, listUserSampah, listAllSampah, updateStatusSampah } = require('../controllers/sampahController');
const { verifyToken, requireRole } = require('../middleware/auth');

module.exports = [
  {
    method: 'POST',
    path: '/sampah',
    options: {
      pre: [verifyToken],
      handler: createSampah,
      validate: {
        payload: Joi.object({
          jenis: Joi.string().required(),
          foto: Joi.string().required(),
          jumlah: Joi.number().required(),
          estimasiPoin: Joi.number().required(),
          metode: Joi.string().valid('diantar', 'dijemput').required(),
          lokasi: Joi.string().required(),
          tanggal: Joi.date().required()
        })
      },
      description: 'Create jual sampah',
      tags: ['api', 'sampah']
    }
  },
  {
    method: 'GET',
    path: '/sampah/user',
    options: {
      pre: [verifyToken],
      handler: listUserSampah,
      description: 'List jual sampah user',
      tags: ['api', 'sampah']
    }
  },
  {
    method: 'GET',
    path: '/sampah',
    options: {
      pre: [verifyToken, requireRole('admin')],
      handler: listAllSampah,
      description: 'List semua jual sampah (admin)',
      tags: ['api', 'sampah']
    }
  },
  {
    method: 'PUT',
    path: '/sampah/{id}/status',
    options: {
      pre: [verifyToken, requireRole('admin')],
      handler: updateStatusSampah,
      validate: {
        payload: Joi.object({
          status: Joi.string().valid('pending', 'approved', 'cancel').required()
        })
      },
      description: 'Update status jual sampah (admin)',
      tags: ['api', 'sampah']
    }
  }
]; 