import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Report() {
  const [studentId, setStudentId] = useState('');
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFetch = async () => {
    if (!studentId) { setMessage('Please enter a student ID!'); return; }
    try {
      const res = await axios.get(`http://127.0.0.1:8000/attendance/report/${studentId}`);
      setReport(res.data);
      setMessage('');
    } catch (err) {
      setMessage('Error fetching report!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Student Attendance Portal</h2>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>Back</button>
      </div>
      <div style={styles.content}>
        <h3>Attendance Report</h3>
        <div style={styles.form}>
          <input style={styles.input} placeholder="Enter Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
          <button style={styles.button} onClick={handleFetch}>Get Report</button>
          {message && <p style={{color: 'red'}}>{message}</p>}
        </div>
        {report && (
          <div style={styles.reportBox}>
            <h4>Report Summary</h4>
            <p>Total Classes: <strong>{report.total_classes}</strong></p>
            <p>Present: <strong style={{color: 'green'}}>{report.present}</strong></p>
            <p>Absent: <strong style={{color: 'red'}}>{report.absent}</strong></p>
            <p>Attendance %: <strong>{report.percentage}%</strong></p>
            {report.shortage_alert && (
              <div style={styles.alert}>
                ⚠️ SHORTAGE ALERT! Attendance below 75%!
              </div>
            )}
          </div>
        )}
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
  form: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', maxWidth: '400px', marginBottom: '20px' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' },
  reportBox: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', maxWidth: '400px' },
  alert: { backgroundColor: '#ff4444', color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center', fontWeight: 'bold', marginTop: '10px' }
};

export default Report;