import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://student-attendance-portal-phec.onrender.com';

function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/auth/students`);
      setStudents(res.data.data);
      const initial = {};
      res.data.data.forEach(s => { initial[s.id] = 'present'; });
      setAttendance(initial);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!date || !subject) { setMessage('Please fill date and subject!'); return; }
    setLoading(true);
    try {
      for (const student of students) {
        await axios.post(`${API}/attendance/mark`, {
          student_id: student.id,
          date,
          status: attendance[student.id] || 'present',
          subject
        });
      }
      setMessage('Attendance marked for all students!');
    } catch (err) {
      setMessage('Error marking attendance!');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Student Attendance Portal</h2>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>Back</button>
      </div>
      <div style={styles.content}>
        <h3>Mark Attendance — CSE Class</h3>
        <div style={styles.topForm}>
          <input style={styles.input} type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input style={styles.input} placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <button style={styles.button} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : '✅ Submit Attendance'}
          </button>
        </div>
        {message && <p style={{color: message.includes('Error') ? 'red' : 'green'}}>{message}</p>}
        <div style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>
                    <select
                      style={{
                        ...styles.select,
                        backgroundColor: attendance[student.id] === 'present' ? '#dcfce7' : '#fee2e2',
                        color: attendance[student.id] === 'present' ? '#16a34a' : '#dc2626'
                      }}
                      value={attendance[student.id] || 'present'}
                      onChange={e => setAttendance({...attendance, [student.id]: e.target.value})}
                    >
                      <option value="present">✅ Present</option>
                      <option value="absent">❌ Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  topForm: { display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' },
  button: { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontSize: '14px', cursor: 'pointer' },
  tableBox: { backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#1a1a2e' },
  th: { padding: '15px', color: 'white', textAlign: 'left', fontSize: '14px' },
  td: { padding: '12px 15px', fontSize: '14px' },
  trEven: { backgroundColor: '#f8fafc' },
  trOdd: { backgroundColor: 'white' },
  select: { padding: '6px 10px', borderRadius: '5px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }
};

export default MarkAttendance;