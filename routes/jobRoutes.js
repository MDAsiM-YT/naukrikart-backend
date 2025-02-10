const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new job (Only for your team)
router.post('/', async (req, res) => {
    const { title, company, location, applyLink } = req.body;

    if (!title || !company || !applyLink) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({ title, company, location, applyLink });

    try {
        await newJob.save();
        res.status(201).json({ message: "Job added successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
