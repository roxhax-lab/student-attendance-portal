import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://student-attendance-portal-phec.onrender.com/auth/login', {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Student Attendance Portal</h2>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.button} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  box: { backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '350px' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#333' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center' }
};

export default Login;