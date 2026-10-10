import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ElderScreen from './components/ElderScreen';
import CaregiverDashboard from './components/CaregiverDashboard';

const socket = io('http://localhost:5000');

export default function App() {
  const [reminder, setReminder] = useState({
    id: 'rem_101',
    medicineName: 'BP Tablet (Telmisartan 40mg)',
    status: 'pending',
    caregiverPhone: '+919876543210'
  });

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on('initialState', (data) => {
      setReminder(data);
    });

    socket.on('statusUpdate', ({ reminder: updated, message }) => {
      setReminder(updated);
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
    });

    socket.on('alarmWarning', ({ count }) => {
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - Warning: Alarm #${count} went unanswered`]);
    });

    socket.on('criticalAlert', ({ reminder: updated, alert }) => {
      setReminder(updated);
      setLogs(prev => [...prev, `🚨 ${new Date().toLocaleTimeString()} - ${alert}`]);
    });

    return () => {
      socket.off('initialState');
      socket.off('statusUpdate');
      socket.off('alarmWarning');
      socket.off('criticalAlert');
    };
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '32px', color: '#1e1b4b', margin: '0' }}>CareBell 🔔</h1>
        <p style={{ color: '#64748b', fontSize: '16px', margin: '6px 0' }}>Smart Elder Care Medicine Reminder & SOS Escalation System</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <ElderScreen socket={socket} reminder={reminder} />
        <CaregiverDashboard reminder={reminder} logs={logs} />
      </div>
    </div>
  );
}