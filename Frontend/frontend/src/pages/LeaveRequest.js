import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LeaveRequest() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !reason) {
      setMessage('Please fill all fields!');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/leave/apply', {
        student_id: user.id,
        from_date: fromDate,
        to_date: toDate,
        reason
      });
      setMessage('Leave request submitted successfully!');
    } catch (err) {
      setMessage('Error submitting leave request!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Student Attendance Portal</h2>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>Back</button>
      </div>
      <div style={styles.content}>
        <h3>Apply for Leave</h3>
        <div style={styles.form}>
          <label style={styles.label}>From Date</label>
          <input style={styles.input} type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          <label style={styles.label}>To Date</label>
          <input style={styles.input} type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
          <label style={styles.label}>Reason</label>
          <textarea style={{...styles.input, height: '100px'}} placeholder="Reason for leave" value={reason} onChange={e => setReason(e.target.value)} />
          <button style={styles.button} onClick={handleSubmit}>Submit Leave Request</button>
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
  label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }
};

export default LeaveRequest;