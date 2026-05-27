import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.badge}>🚀 Full Stack Auth System</div>
        <h1 style={styles.title}>Welcome to <span style={styles.highlight}>WebDemo</span></h1>
        <p style={styles.subtitle}>
          Secure authentication with role-based access control powered by Spring Boot + React + JWT
        </p>
        {isAuthenticated() ? (
          <div style={styles.userCard}>
            <div style={styles.userAvatar}>{user?.username?.charAt(0).toUpperCase()}</div>
            <div>
              <p style={styles.userGreet}>Welcome back,</p>
              <h3 style={styles.userName}>{user?.username}</h3>
              <span style={user?.role === 'ADMIN' ? styles.adminBadge : styles.userBadge}>
                {user?.role === 'ADMIN' ? '👑 ADMIN' : '👤 USER'}
              </span>
            </div>
          </div>
        ) : (
          <div style={styles.buttons}>
            <Link to="/login" style={styles.primaryBtn}>Login →</Link>
            <Link to="/register" style={styles.secondaryBtn}>Register</Link>
          </div>
        )}
      </div>

      <div style={styles.features}>
        {[
          { icon: '🔐', title: 'JWT Auth', desc: 'Secure token-based authentication with 24hr expiry' },
          { icon: '👥', title: 'Role Based', desc: 'USER & ADMIN with protected route access' },
          { icon: '⚡', title: 'Spring Boot', desc: 'Powerful Java backend with Spring Security' },
        ].map((f, i) => (
          <div key={i} style={styles.featureCard}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Outfit', sans-serif" },
  hero: {
    textAlign: 'center',
    padding: '80px 20px 60px',
    background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
    borderRadius: '24px',
    marginBottom: '32px',
    border: '1px solid #e0e7ff',
  },
  badge: {
    display: 'inline-block',
    background: '#eef2ff',
    border: '1px solid #c7d2fe',
    color: '#4f46e5',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  title: { fontSize: '48px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px', lineHeight: 1.2 },
  highlight: { color: '#6366f1' },
  subtitle: { fontSize: '17px', color: '#64748b', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.6 },
  buttons: { display: 'flex', gap: '12px', justifyContent: 'center' },
  primaryBtn: {
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: 'white', padding: '12px 28px',
    borderRadius: '12px', textDecoration: 'none',
    fontWeight: '600', fontSize: '16px',
    boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
  },
  secondaryBtn: {
    background: 'white', color: '#6366f1',
    padding: '12px 28px', borderRadius: '12px',
    textDecoration: 'none', fontWeight: '600',
    fontSize: '16px', border: '2px solid #e0e7ff',
  },
  userCard: {
    display: 'inline-flex', alignItems: 'center',
    gap: '16px', background: 'white',
    padding: '20px 32px', borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e0e7ff', textAlign: 'left',
  },
  userAvatar: {
    width: '52px', height: '52px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '22px', fontWeight: '700', color: 'white',
  },
  userGreet: { color: '#94a3b8', fontSize: '13px', margin: '0 0 2px' },
  userName: { color: '#0f172a', fontSize: '20px', fontWeight: '700', margin: '0 0 6px' },
  adminBadge: { background: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  userBadge: { background: '#d1fae5', color: '#065f46', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  features: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  featureCard: {
    background: 'white', padding: '28px',
    borderRadius: '16px', border: '1px solid #f1f5f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center',
  },
  featureIcon: { fontSize: '36px', marginBottom: '12px' },
  featureTitle: { color: '#0f172a', fontWeight: '700', fontSize: '18px', margin: '0 0 8px' },
  featureDesc: { color: '#64748b', fontSize: '14px', margin: 0, lineHeight: 1.5 },
};

export default Home;