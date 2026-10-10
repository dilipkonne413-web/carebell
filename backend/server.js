const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// In-memory dummy state for instant hackathon demo
let activeReminder = {
  id: 'rem_101',
  medicineName: 'BP Tablet (Telmisartan 40mg)',
  status: 'pending',
  alarmCount: 0,
  caregiverPhone: process.env.CAREGIVER_PHONE || '+919876543210'
};

// Check API
app.get('/api/reminder', (req, res) => {
  res.json(activeReminder);
});

// Socket.io Real-time engine
io.on('connection', (socket) => {
  console.log('⚡ Device connected:', socket.id);

  // Send current state on connect
  socket.emit('initialState', activeReminder);

  // Elder clicks "Vesukunnanu"
  socket.on('medicineTaken', () => {
    activeReminder.status = 'taken';
    activeReminder.alarmCount = 0;
    console.log('✅ Medicine taken by patient!');
    io.emit('statusUpdate', {
      reminder: activeReminder,
      message: 'Grandpa successfully took the medicine! Alarm dismissed.'
    });
  });

  // Each missed alarm cycle (1, 2, 3)
  socket.on('alarmMissedCycle', ({ count }) => {
    activeReminder.alarmCount = count;

    if (count >= 3) {
      activeReminder.status = 'missed';
      console.log('🚨 3 ALARMS IGNORED! SENDING SOS CALL/SMS TO:', activeReminder.caregiverPhone);
      
      io.emit('criticalAlert', {
        reminder: activeReminder,
        alert: `Critical Alert: 3 alarms ignored! SMS alert dispatched to ${activeReminder.caregiverPhone}`
      });
    } else {
      console.log(`⚠️ Alarm #${count} ignored...`);
      io.emit('alarmWarning', { count });
    }
  });

  // Reset demo for judges
  socket.on('resetDemo', () => {
    activeReminder.status = 'pending';
    activeReminder.alarmCount = 0;
    io.emit('statusUpdate', {
      reminder: activeReminder,
      message: 'Demo state reset to pending.'
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 CareBell Server running on port ${PORT}`);
});