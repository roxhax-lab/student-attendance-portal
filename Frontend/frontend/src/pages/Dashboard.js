import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/');
    } else {
      setUser(JSON.parse(stored));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Student Attendance Portal</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>
      <div style={styles.content}>
        <h3>Welcome, {user?.name}! 👋</h3>
        <p>Role: <strong>{user?.role}</strong></p>
        <div style={styles.cards}>
          <div style={styles.card}>📋 Mark Attendance</div>
          <div style={styles.card}>📅 Leave Requests</div>
          <div style={styles.card}>📊 Reports</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  navbar: { backgroundColor: '#4CAF50', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navTitle: { color: 'white', margin: 0 },
  logoutBtn: { padding: '8px 16px', backgroundColor: 'white', color: '#4CAF50', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  content: { padding: '30px' },
  cards: { display: 'flex', gap: '20px', marginTop: '20px' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontSize: '18px', cursor: 'pointer', flex: 1, textAlign: 'center' }
};

export default Dashboard;