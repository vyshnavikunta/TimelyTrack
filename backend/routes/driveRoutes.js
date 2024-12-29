const express = require('express');
const Drive = require('../models/driveModel');

const router = express.Router();

// Create a drive
router.post('/', async (req, res) => {
  try {
    const newDrive = new Drive(req.body);
    await newDrive.save();
    res.status(201).json({ message: 'Drive created successfully', data: newDrive });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create drive', details: err });
  }
});

// Fetch drives
router.get('/', async (req, res) => {
  try {
    const drives = await Drive.find(); // Fetch all drives from DB
    res.status(200).json(drives);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drives', details: err });
  }
});

module.exports = router;
