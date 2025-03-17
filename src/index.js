const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cron = require('node-cron');
const { fetchWeather, sendWeatherEmail } = require('./services/weatherService');
const User = require('./models/User');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Schedule weather reports
cron.schedule('0 */3 * * *', async () => {
  const users = await User.find();
  users.forEach(async (user) => {
    const weatherData = await fetchWeather(user.location);
    await sendWeatherEmail(user.email, weatherData);
    user.weatherData.push(weatherData);
    await user.save();
  });
});