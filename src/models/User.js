const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  verificationToken: { type: String }, // Add this field
  isVerified: { type: Boolean, default: false }, // Add this field
  weatherData: [
    {
      date: { type: Date, default: Date.now },
      temperature: Number,
      description: String,
      city: String,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);