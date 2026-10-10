const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'taken', 'missed'], default: 'pending' },
  alarmCount: { type: Number, default: 0 },
  caregiverPhone: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reminder', ReminderSchema);