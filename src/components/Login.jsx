import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      navigate(result.user.role === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>⚡</div>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Login to your WebDemo account</p>
        {error && <div style={styles.error}>⚠️ {error}</div>}
        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account? <Link to="/register" style={styles.linkA}>Register here</Link>
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
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    borderRadius: '14px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', marginBottom: '20px',
  },
  title: { fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px' },
  subtitle: { fontSize: '14px', color: '#94a3b8', margin: '0 0 28px' },
  error: {
    background: '#fef2f2', border: '1px solid #fecaca',
    color: '#dc2626', padding: '12px 16px',
    borderRadius: '10px', fontSize: '14px', marginBottom: '20px',
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
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: 'white', border: 'none', borderRadius: '12px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
    marginTop: '8px', boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
    fontFamily: "'Outfit', sans-serif",
  },
  linkText: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' },
  linkA: { color: '#6366f1', fontWeight: '600', textDecoration: 'none' },
};

export default Login;