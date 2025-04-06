const Booking = require('../models/Booking');

// Helper to check time overlap
const timeOverlap = (startA, endA, startB, endB) => {
  return startA < endB && startB < endA;
};

const checkBookingConflict = async (workspace, date, startTime, endTime, excludeId = null) => {
  const query = {
    workspace,
    date: new Date(date),
    status: 'active'
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const bookings = await Booking.find(query);

  for (const booking of bookings) {
    if (timeOverlap(startTime, endTime, booking.startTime, booking.endTime)) {
      return true; // Conflict exists
    }
  }

  return false; // No conflict
};

module.exports = checkBookingConflict;
