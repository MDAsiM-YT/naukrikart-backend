const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON data

// Connect to MongoDB (Make sure you have MongoDB Atlas connected)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Job Schema & Model
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  link: String
});
const Job = mongoose.model("Job", jobSchema);

// ✅ API Route to Get All Jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch jobs from MongoDB
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
