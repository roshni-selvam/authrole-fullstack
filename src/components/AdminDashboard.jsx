import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user, getAuthHeader } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdminData();
    fetchAllUsers();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/hello`, getAuthHeader());
      setMessage(response.data.message);
    } catch (error) { console.error('Error:', error); }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/all-users`, getAuthHeader());
      setUsers(response.data);
    } catch (error) { console.error('Error:', error); }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/api/admin/delete-user/${userId}`, getAuthHeader());
        fetchAllUsers();
      } catch (error) { console.error('Error:', error); }
    }
  };

  const updateRole = async (userId, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    if (window.confirm(`Change role to ${newRole}?`)) {
      try {
       await axios.put(`${API_URL}/api/admin/update-role/${userId}`, { role: newRole }, getAuthHeader());
        fetchAllUsers();
      } catch (error) { console.error('Error:', error); }
    }
  };

  const admins = users.filter(u => u.role === 'ADMIN').length;
  const regularUsers = users.filter(u => u.role === 'USER').length;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.avatar}>👑</div>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.subtitle}>Welcome, {user?.username} — Full access granted</p>
          </div>
          <span style={styles.roleBadge}>ADMIN</span>
        </div>

        <div style={styles.statsRow}>
          {[
            { label: 'Total Users', value: users.length, icon: '👥', color: '#6366f1' },
            { label: 'Admins', value: admins, icon: '👑', color: '#f59e0b' },
            { label: 'Regular Users', value: regularUsers, icon: '👤', color: '#10b981' },
          ].map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={{...styles.statIconWrap, background: s.color + '20', color: s.color}}>{s.icon}</div>
              <p style={styles.statLabel}>{s.label}</p>
              <p style={{...styles.statValue, color: s.color}}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={styles.messageCard}>
          <span style={styles.messageDot}></span>
          <p style={styles.messageText}>{message || 'Loading...'}</p>
        </div>
      
        <div style={styles.tableCard}>
          <h2 style={styles.tableTitle}>All Users</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Edit Role</th>
                <th style={styles.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
             {users.map((u, i) => (
             <tr key={u.id} style={{...styles.tr, background: i % 2 === 0 ? 'white' : '#f8fafc'}}>
               <td style={styles.td}>
        <span style={styles.idBadge}>#{u.id}</span>
      </td>
      <td style={styles.td}>
        <div style={styles.userCell}>
          <div style={styles.miniAvatar}>
            {u.username ? u.username.charAt(0).toUpperCase() : '?'}
          </div>
          <span style={styles.username}>{u.username || 'Unknown'}</span>
        </div>
      </td>
      {/* Role Column */}
      <td style={styles.td}>
        <span style={u.role === 'ADMIN' ? styles.adminRole : styles.userRole}>
          {u.role === 'ADMIN' ? '👑' : '👤'} {u.role}
        </span>
      </td>
      {/* Edit Role Column */}
      <td style={styles.td}>
        {u.username !== 'admin' && (
          <button onClick={() => updateRole(u.id, u.role)} style={u.role === 'ADMIN' ? styles.demoteBtn : styles.promoteBtn}>
            {u.role === 'ADMIN' ? '↓ Make USER' : '↑ Make ADMIN'}
          </button>
        )}
      </td>
      {/* Delete Column */}
      <td style={styles.td}>
        {u.username !== 'admin' && (
          <button onClick={() => deleteUser(u.id)} style={styles.deleteBtn}>🗑 Delete</button>
        )}
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
  page: { minHeight: '100vh', background: '#f8fafc', fontFamily: "'Outfit', sans-serif" },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' },
  header: {
    display: 'flex', alignItems: 'center', gap: '20px',
    background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    padding: '32px', borderRadius: '20px',
    marginBottom: '24px', color: 'white',
  },
  avatar: {
    width: '60px', height: '60px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '28px', border: '2px solid rgba(255,255,255,0.3)',
  },
  title: { fontSize: '26px', fontWeight: '700', margin: '0 0 4px' },
  subtitle: { color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '14px' },
  roleBadge: {
    marginLeft: 'auto', background: '#f59e0b',
    color: '#000', padding: '8px 20px',
    borderRadius: '20px', fontSize: '13px', fontWeight: '800',
    letterSpacing: '0.5px',
  },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' },
  statCard: {
    background: 'white', padding: '24px',
    borderRadius: '16px', textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
  },
  statIconWrap: {
    width: '48px', height: '48px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '22px', margin: '0 auto 10px',
  },
  statLabel: { color: '#94a3b8', fontSize: '12px', fontWeight: '600', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  statValue: { fontSize: '32px', fontWeight: '800', margin: 0 },
  messageCard: {
    background: '#f0fdf4', border: '1px solid #bbf7d0',
    padding: '14px 20px', borderRadius: '12px',
    marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
  },
  messageDot: { width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block', flexShrink: 0 },
  messageText: { color: '#065f46', fontSize: '14px', fontWeight: '500', margin: 0 },
  tableCard: {
    background: 'white', borderRadius: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9', overflow: 'hidden',
  },
  tableTitle: { padding: '24px 24px 16px', margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', borderBottom: '1px solid #f1f5f9' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHead: { background: '#f8fafc' },
  th: { padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' },
  tr: { borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' },
  td: { padding: '14px 20px' },
  idBadge: { background: '#f1f5f9', color: '#64748b', padding: '3px 8px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' },
  userCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  miniAvatar: {
    width: '32px', height: '32px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', fontWeight: '700', color: 'white',
  },
  username: { fontWeight: '600', color: '#0f172a', fontSize: '14px' },
  adminRole: { background: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  userRole: { background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  promoteBtn: {
    background: '#eef2ff', color: '#4f46e5',
    border: '1px solid #c7d2fe', padding: '6px 14px',
    borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
  },
  demoteBtn: {
    background: '#fefce8', color: '#b45309',
    border: '1px solid #fde68a', padding: '6px 14px',
    borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
  },
  deleteBtn: {
    background: '#fef2f2', color: '#dc2626',
    border: '1px solid #fecaca', padding: '6px 14px',
    borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
  },
};

export default AdminDashboard;