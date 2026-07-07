import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async () => {
    setError('');
    if (!username.trim() || !password.trim()) return setError('Username and Password required ❌');
    if (username.trim().length < 3) return setError('Username must be at least 3 characters ❌');
    if (password.trim().length < 6) return setError('Password must be at least 6 characters ❌');

    try {
      await axios.post(`${API_URL}/api/register`, {
        username: username.trim(),
        password,
        role: 'USER',
      });
      setSuccess('Registered successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration Error ❌');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>📝</div>
        <h2 style={styles.title}>Create account</h2>
        {error && <div style={styles.error}>⚠️ {error}</div>}
        {success && <div style={styles.success}>✅ {success}</div>}
        <div style={styles.field}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleRegister} style={styles.button}>Register →</button>
        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={styles.linkA}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Outfit', sans-serif",
  },
  card: {
    background: 'white', padding: '48px 40px',
    borderRadius: '24px', width: '100%', maxWidth: '400px',
    boxShadow: '0 20px 60px rgba(99,102,241,0.12)',
    border: '1px solid #e0e7ff',
  },
  iconWrap: {
    width: '52px', height: '52px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    borderRadius: '14px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', marginBottom: '20px',
  },
  title: { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px' },
  subtitle: { fontSize: '14px', color: '#94a3b8', margin: '0 0 28px' },
  error: {
    background: '#fef2f2', border: '1px solid #fecaca',
    color: '#dc2626', padding: '12px 16px',
    borderRadius: '10px', fontSize: '14px', marginBottom: '16px',
  },
  success: {
    background: '#f0fdf4', border: '1px solid #bbf7d0',
    color: '#15803d', padding: '12px 16px',
    borderRadius: '10px', fontSize: '14px', marginBottom: '16px',
  },
  field: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' },
  input: {
    width: '100%', padding: '12px 16px',
    border: '2px solid #f1f5f9', borderRadius: '10px',
    fontSize: '15px', outline: 'none', boxSizing: 'border-box',
    color: '#0f172a', background: '#f8fafc',
    fontFamily: "'Outfit', sans-serif",
  },
  button: {
    width: '100%', padding: '14px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white', border: 'none', borderRadius: '12px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
    marginTop: '8px', boxShadow: '0 4px 15px rgba(16,185,129,0.4)',
    fontFamily: "'Outfit', sans-serif",
  },
  linkText: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' },
  linkA: { color: '#6366f1', fontWeight: '600', textDecoration: 'none' },
};

export default Register;