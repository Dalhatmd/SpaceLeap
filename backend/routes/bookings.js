const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// CREATE Booking
router.post('/', auth, async (req, res) => {
  try {
    const { workspace, date, startTime, endTime } = req.body;
    const booking = new Booking({
      user: req.user.userId,
      workspace,
      date,
      startTime,
      endTime
    });
    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET All Bookings (User-specific)
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET Single Booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.userId });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE Booking
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Booking not found or unauthorized' });
    res.status(200).json({ message: 'Booking updated', updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE Booking (Cancel)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!deleted) return res.status(404).json({ message: 'Booking not found or unauthorized' });
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
