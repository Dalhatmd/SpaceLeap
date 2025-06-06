const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ['admin', 'employee', 'learner'], // TODO: Probably change roles
    default: 'employee'
  },
  notifications: [{
    type: {
      type: String,
      enum: ['booking_confirmation', 'reminder', 'cancellation', 'change'],
    required: true
    },
    message: String,
    bookingId: mongoose.Schema.Types.ObjectId,
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
