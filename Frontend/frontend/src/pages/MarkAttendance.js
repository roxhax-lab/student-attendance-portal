import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MarkAttendance() {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!studentId || !date || !subject) {
      setMessage('Please fill all fields!');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/attendance/mark', {
        student_id: studentId,
        date,
        status,
        subject
      });
      setMessage('Attendance marked successfully!');
    } catch (err) {
      setMessage('Error marking attendance!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Student Attendance Portal</h2>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>Back</button>
      </div>
      <div style={styles.content}>
        <h3>Mark Attendance</h3>
        <div style={styles.form}>
          <input style={styles.input} placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
          <input style={styles.input} type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input style={styles.input} placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <select style={styles.input} value={status} onChange={e => setStatus(e.target.value)}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          <button style={styles.button} onClick={handleSubmit}>Mark Attendance</button>
          {message && <p style={{color: message.includes('success') ? 'green' : 'red'}}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  navbar: { backgroundColor: '#4CAF50', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navTitle: { color: 'white', margin: 0 },
  backBtn: { padding: '8px 16px', backgroundColor: 'white', color: '#4CAF50', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  content: { padding: '30px' },
  form: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', maxWidth: '400px' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }
};

export default MarkAttendance;