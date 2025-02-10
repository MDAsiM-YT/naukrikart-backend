require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(express.json());

// Enable CORS for frontend requests
app.use(cors({
  origin: "https://naukrikart-frontend.vercel.app", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Stop the server if DB connection fails
  });

// Routes
app.use('/api/jobs', jobRoutes);

// Define PORT properly
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
