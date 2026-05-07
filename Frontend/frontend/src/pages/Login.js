import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://student-attendance-portal-phec.onrender.com';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <h1 style={styles.brandTitle}>📋 AttendanceIQ</h1>
          <p style={styles.brandSubtitle}>Smart Attendance Management for Modern Institutions</p>
          <div style={styles.features}>
            <div style={styles.feature}>✅ Real-time Attendance Tracking</div>
            <div style={styles.feature}>📊 Instant Reports & Analytics</div>
            <div style={styles.feature}>⚠️ Shortage Alerts</div>
            <div style={styles.feature}>📅 Leave Management</div>
          </div>
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.box}>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Sign in to your account</p>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button
            style={loading ? styles.buttonLoading : styles.button}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', height: '100vh', fontFamily: "'Segoe UI', sans-serif" },
  left: { flex: 1, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
  leftContent: { color: 'white', maxWidth: '400px' },
  brandTitle: { fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', margin: '0 0 10px 0' },
  brandSubtitle: { fontSize: '16px', opacity: 0.8, marginBottom: '40px', lineHeight: '1.6' },
  features: { display: 'flex', flexDirection: 'column', gap: '15px' },
  feature: { backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', backdropFilter: 'blur(10px)' },
  right: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '40px' },
  box: { backgroundColor: 'white', padding: '50px', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e', margin: '0 0 8px 0' },
  subtitle: { color: '#64748b', marginBottom: '30px', margin: '0 0 30px 0' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151', fontSize: '14px' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', outline: 'none', transition: 'border 0.2s' },
  button: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  buttonLoading: { width: '100%', padding: '14px', backgroundColor: '#94a3b8', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'not-allowed', marginTop: '10px' },
  error: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '15px' }
};

export default Login;