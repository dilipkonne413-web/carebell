import React from 'react';

export default function CaregiverDashboard({ reminder, logs }) {
  const getStatusBadge = (status) => {
    if (status === 'taken') {
      return (
        <span style={{ background: '#22c55e', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
          Taken ✅
        </span>
      );
    }
    if (status === 'missed') {
      return (
        <span style={{ background: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
          Missed / Alert Dispatched 🚨
        </span>
      );
    }
    return (
      <span style={{ background: '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
        Pending ⏳
      </span>
    );
  };

  return (
    <div style={{ padding: '24px', border: '3px solid #3b82f6', borderRadius: '16px', background: '#f8fafc' }}>
      <h2 style={{ fontSize: '24px', color: '#0f172a' }}>📱 Son / Caregiver Dashboard</h2>
      
      <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', marginTop: '16px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '8px 0' }}><strong>Target Patient:</strong> Grandpa</p>
        <p style={{ margin: '8px 0' }}><strong>Medicine:</strong> {reminder?.medicineName || 'BP Tablet'}</p>
        <p style={{ margin: '8px 0' }}><strong>Status:</strong> {getStatusBadge(reminder?.status)}</p>
        <p style={{ margin: '8px 0' }}><strong>Alert Receiver:</strong> {reminder?.caregiverPhone || '+919876543210'}</p>
      </div>

      <h3 style={{ marginTop: '20px', color: '#334155' }}>Live Event Audit Logs:</h3>
      <div style={{ minHeight: '140px', maxHeight: '180px', overflowY: 'auto', background: '#0f172a', color: '#38bdf8', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}>
        {logs && logs.length === 0 ? (
          <p style={{ margin: '0' }}>&gt; System connected. Listening for events...</p>
        ) : (
          logs.map((log, index) => (
            <p key={index} style={{ margin: '4px 0' }}>&gt; {log}</p>
          ))
        )}
      </div>
    </div>
  );
}