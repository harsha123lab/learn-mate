require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const planRoutes = require('./routes/planRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * LearnMate Backend - Express Server
 */

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', planRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ error: 'Internal server error. Please try again later.' });
});

// Database Connection & Server Start
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnmate';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB.');
  app.listen(PORT, () => {
    console.log(`LearnMate Backend running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB Connection Error:', error.message);
  process.exit(1);
});
