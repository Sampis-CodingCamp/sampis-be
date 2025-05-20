const mongoose = require('mongoose');

const penukaranPoinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jumlah: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'cancel'], default: 'pending' },
  tanggal: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PenukaranPoin = mongoose.model('PenukaranPoin', penukaranPoinSchema);
module.exports = PenukaranPoin; 