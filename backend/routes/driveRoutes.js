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

// Update a drive (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDrive = await Drive.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDrive) {
      return res.status(404).json({ error: 'Drive not found' });
    }

    res.status(200).json({ message: 'Drive updated successfully', data: updatedDrive });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update drive', details: err });
  }
});

// Delete a drive (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDrive = await Drive.findByIdAndDelete(id);

    if (!deletedDrive) {
      return res.status(404).json({ error: 'Drive not found' });
    }

    res.status(200).json({ message: 'Drive deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete drive', details: err });
  }
});

module.exports = router;
