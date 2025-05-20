const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  try {
    console.log('Mencoba koneksi ke MongoDB...');
    console.log('URI:', config.mongodbUri);
    
    await mongoose.connect(config.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB terkoneksi');
  } catch (error) {
    console.error('Error koneksi MongoDB:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

module.exports = connectDB; 