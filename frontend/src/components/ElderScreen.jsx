import React, { useState, useRef } from 'react';

export default function ElderScreen({ socket, reminder }) {
  const [alarmCount, setAlarmCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const timerRef = useRef(null);

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(700, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const triggerAlarmCycle = () => {
    setIsTaken(false);
    setIsPlaying(true);
    let count = 1;
    setAlarmCount(count);
    playBeep();

    // 8 seconds per alarm cycle for demo
    timerRef.current = setInterval(() => {
      count += 1;
      setAlarmCount(count);
      playBeep();

      socket.emit('alarmMissedCycle', { count });

      if (count >= 3) {
        clearInterval(timerRef.current);
        setIsPlaying(false);
      }
    }, 8000);
  };

  const handleTaken = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setIsTaken(true);
    socket.emit('medicineTaken');
  };

  return (
    <div style={{ padding: '24px', border: '3px solid #22c55e', borderRadius: '16px', background: '#f8fafc', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', color: '#0f172a' }}>👴 Elder Patient Interface</h2>
      
      {!isPlaying && !isTaken && (
        <button 
          onClick={triggerAlarmCycle}
          style={{ padding: '16px 28px', fontSize: '18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', marginTop: '20px' }}
        >
          ⏰ Trigger Alarm Time Demo
        </button>
      )}

      {isPlaying && (
        <div style={{ marginTop: '20px', padding: '24px', background: '#fee2e2', border: '2px solid #ef4444', borderRadius: '14px' }}>
          <h1 style={{ fontSize: '32px', color: '#b91c1c', margin: '0' }}>🔔 MEDICINE TIME!</h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '12px 0' }}>{reminder.medicineName}</p>
          <p style={{ fontSize: '18px', color: '#991b1b', fontWeight: '600' }}>Alarm Ringing: {alarmCount} of 3</p>

          <button
            onClick={handleTaken}
            style={{
              padding: '20px 40px',
              fontSize: '26px',
              fontWeight: 'bold',
              background: '#16a34a',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              marginTop: '16px',
              boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
            }}
          >
            ✅ Vesukunnanu (Stop)
          </button>
        </div>
      )}

      {isTaken && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#dcfce7', borderRadius: '12px' }}>
          <h2 style={{ color: '#15803d' }}>🎉 Medicine Taken! All Clear.</h2>
          <button 
            onClick={() => { setIsTaken(false); socket.emit('resetDemo'); }}
            style={{ marginTop: '10px', padding: '8px 16px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Reset Demo
          </button>
        </div>
      )}
    </div>
  );
}