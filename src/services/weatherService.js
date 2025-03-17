const axios = require('axios');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const crypto = require('crypto');

// Generate a verification token
const generateToken = () => {
  return crypto.randomBytes(20).toString('hex'); // Generates a random 40-character hex string
};

// Fetch weather data
const fetchWeather = async (location) => {
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return {
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
    city: response.data.name,
  };
};

// Send verification email
const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    text: `Your verification token is: ${token}`,
  };

  await transporter.sendMail(mailOptions);
};

// Send weather email
const sendWeatherEmail = async (email, weatherData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Hourly Weather Report',
    text: `Temperature: ${weatherData.temperature}°C, Description: ${weatherData.description}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { generateToken, fetchWeather, sendVerificationEmail, sendWeatherEmail };