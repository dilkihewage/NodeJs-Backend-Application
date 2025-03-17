const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, fetchWeather, sendVerificationEmail, sendWeatherEmail } = require('../services/weatherService');

// Register a new user
router.post('/register', async (req, res) => {
  const { email, location } = req.body;
  try {
    const token = generateToken();
    const user = new User({ email, location, verificationToken: token });
    await user.save();

    // Send verification email
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'User registered. Please check your email for verification.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verify email
router.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(403).json({ error: 'Invalid verification token' });
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verificationToken = null; // Clear the token
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newToken = generateToken();
    user.verificationToken = newToken;
    await user.save();

    // Send the new verification email
    await sendVerificationEmail(email, newToken);

    res.json({ message: 'Verification email sent' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Other routes (update location, fetch weather data, etc.)
// ...

module.exports = router;