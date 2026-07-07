import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


function UserDashboard() {
  const { user, getAuthHeader } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState('');

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/hello`, getAuthHeader());
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.avatar}>{user?.username?.charAt(0).toUpperCase()}</div>
          <div>
            <h1 style={styles.title}>Welcome back, {user?.username}! 👋</h1>
            <p style={styles.subtitle}>Here's your personal dashboard</p>
          </div>
          <span style={styles.roleBadge}>👤 {user?.role}</span>
        </div>

        <div style={styles.statsRow}>
          {[
            { label: 'Account Status', value: 'Active', icon: '✅' },
            { label: 'Role', value: user?.role, icon: '🎭' },
            { label: 'Access Level', value: 'Standard', icon: '🔑' },
          ].map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statIcon}>{s.icon}</div>
              <p style={styles.statLabel}>{s.label}</p>
              <p style={styles.statValue}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={styles.messageCard}>
          <div style={styles.messageHeader}>
            <span style={styles.messageDot}></span>
            <h3 style={styles.messageTitle}>Server Message</h3>
          </div>
          <p style={styles.messageText}>{message || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc', fontFamily: "'Outfit', sans-serif" },
  container: { maxWidth: '900px', margin: '0 auto', padding: '40px 20px' },
  header: {
    display: 'flex', alignItems: 'center', gap: '20px',
    background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    padding: '32px', borderRadius: '20px',
    marginBottom: '24px', color: 'white',
  },
  avatar: {
    width: '60px', height: '60px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '26px', fontWeight: '700',
    border: '2px solid rgba(255,255,255,0.3)',
  },
  title: { fontSize: '26px', fontWeight: '700', margin: '0 0 4px' },
  subtitle: { color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '14px' },
  roleBadge: {
    marginLeft: 'auto', background: 'rgba(255,255,255,0.15)',
    padding: '8px 16px', borderRadius: '20px',
    fontSize: '13px', fontWeight: '600',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: {
    background: 'white', padding: '24px',
    borderRadius: '16px', textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
  },
  statIcon: { fontSize: '28px', marginBottom: '8px' },
  statLabel: { color: '#94a3b8', fontSize: '12px', fontWeight: '600', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  statValue: { color: '#0f172a', fontSize: '18px', fontWeight: '700', margin: 0 },
  messageCard: {
    background: 'white', padding: '28px',
    borderRadius: '16px', border: '1px solid #f1f5f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  messageHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  messageDot: { width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', display: 'inline-block' },
  messageTitle: { color: '#0f172a', fontWeight: '700', fontSize: '16px', margin: 0 },
  messageText: { color: '#64748b', fontSize: '15px', margin: 0, lineHeight: 1.6 },
};

export default UserDashboard;