const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workspace: { type: String, required: true }, // e.g. "Room A", "Desk 5"
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // e.g., "09:00"
  endTime: { type: String, required: true },   // e.g., "11:00"
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
