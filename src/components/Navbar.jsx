import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}> AuthRole</Link>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          {isAuthenticated() && hasRole(['USER', 'ADMIN']) && (
            <Link to="/user-dashboard" style={styles.link}>Dashboard</Link>
          )}
          {isAuthenticated() && hasRole(['ADMIN']) && (
            <Link to="/admin-dashboard" style={styles.link}>Admin</Link>
          )}
          {!isAuthenticated() ? (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={{...styles.link, ...styles.registerBtn}}>Register</Link>
            </>
          ) : (
            <>
              <span style={styles.userBadge}>
                {user?.role === 'ADMIN' ? '👑' : '👤'} {user?.username}
                <span style={user?.role === 'ADMIN' ? styles.adminTag : styles.userTag}>
                  {user?.role}
                </span>
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    fontFamily: "'Outfit', sans-serif",
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  navLinks: { display: 'flex', gap: '8px', alignItems: 'center' },
  link: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
  registerBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  userBadge: {
    color: 'white',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  adminTag: {
    background: '#f59e0b',
    color: '#000',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '20px',
  },
  userTag: {
    background: '#10b981',
    color: 'white',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '20px',
  },
  logoutBtn: {
    background: 'rgba(239,68,68,0.2)',
    color: '#fca5a5',
    border: '1px solid rgba(239,68,68,0.4)',
    padding: '6px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
  },
};

export default Navbar;