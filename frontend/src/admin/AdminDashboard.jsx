import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const { data } = await API.get('/auth/users');
      setUsers(data);
    } catch (err) {
      setUsersError(err.response?.data?.message || 'Failed to fetch users.');
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const initials = (name) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';

  const roleColor = (role) => (role === 'admin' ? '#8b5cf6' : '#06b6d4');

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">ShopNest</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#overview" className="nav-item active">
            <span className="nav-icon">🏠</span>
            <span>Overview</span>
          </a>
          {user?.role === 'admin' && (
            <a href="#users" className="nav-item">
              <span className="nav-icon">👥</span>
              <span>Users</span>
            </a>
          )}
          <a href="/admin/orders" className="nav-item">
            <span className="nav-icon">📦</span>
            <span>Orders</span>
          </a>
          <Link to="/admin/products" className="nav-item">
            <span className="nav-icon">🏷️</span>
            <span>Products</span>
          </Link>
          <a href="#settings" className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-user">
          <div className="avatar">{initials(user?.name)}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span
              className="user-role"
              style={{ color: roleColor(user?.role) }}
            >
              {user?.role}
            </span>
          </div>
          <button
            id="logout-btn"
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            ⎋
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dash-header">
          <div className="header-left">
            <h1 className="page-title" id="overview">
              Dashboard
            </h1>
            <p className="page-sub">
              Welcome back,{' '}
              <strong>{user?.name?.split(' ')[0]}</strong> 👋
            </p>
          </div>
          <div className="header-right">
            <div className="header-badge">
              <span className="badge-dot" />
              Server Online
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card card-purple">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <span className="stat-label">Account</span>
              <span className="stat-value">{user?.name}</span>
            </div>
          </div>
          <div className="stat-card card-cyan">
            <div className="stat-icon">✉️</div>
            <div className="stat-info">
              <span className="stat-label">Email</span>
              <span className="stat-value">{user?.email}</span>
            </div>
          </div>
          <div className="stat-card card-emerald">
            <div className="stat-icon">🛡️</div>
            <div className="stat-info">
              <span className="stat-label">Role</span>
              <span className="stat-value" style={{ textTransform: 'capitalize' }}>
                {user?.role}
              </span>
            </div>
          </div>
          <div className="stat-card card-orange">
            <div className="stat-icon">🔑</div>
            <div className="stat-info">
              <span className="stat-label">Status</span>
              <span className="stat-value">Authenticated</span>
            </div>
          </div>
        </section>

        {/* Profile Card */}
        <section className="profile-section">
          <div className="section-header">
            <h2 className="section-title">My Profile</h2>
          </div>
          <div className="profile-card">
            <div className="profile-avatar">{initials(user?.name)}</div>
            <div className="profile-details">
              <div className="profile-row">
                <span className="profile-key">Full Name</span>
                <span className="profile-val">{user?.name}</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">Email</span>
                <span className="profile-val">{user?.email}</span>
              </div>
              <div className="profile-row">
                <span className="profile-key">Role</span>
                <span
                  className="profile-val role-badge"
                  style={{ background: roleColor(user?.role) }}
                >
                  {user?.role}
                </span>
              </div>
              <div className="profile-row">
                <span className="profile-key">User ID</span>
                <span className="profile-val mono">{user?._id}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Admin: Users Table */}
        {user?.role === 'admin' && (
          <section className="users-section" id="users">
            <div className="section-header">
              <h2 className="section-title">All Users</h2>
              <button
                id="refresh-users-btn"
                className="refresh-btn"
                onClick={fetchUsers}
                disabled={usersLoading}
              >
                {usersLoading ? '⟳ Loading...' : '⟳ Refresh'}
              </button>
            </div>

            {usersError && (
              <div className="table-error">⚠️ {usersError}</div>
            )}

            {!usersLoading && !usersError && (
              <div className="table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Verified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="empty-row">
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((u, i) => (
                        <tr key={u._id} className="table-row">
                          <td className="td-num">{i + 1}</td>
                          <td>
                            <div
                              className="table-avatar"
                              style={{ background: roleColor(u.role) }}
                            >
                              {initials(u.name)}
                            </div>
                          </td>
                          <td className="td-name">{u.name}</td>
                          <td className="td-email">{u.email}</td>
                          <td>
                            <span
                              className="role-pill"
                              style={{ background: roleColor(u.role) }}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`verified-pill ${
                                u.verified ? 'verified' : 'unverified'
                              }`}
                            >
                              {u.verified ? '✓ Yes' : '✗ No'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {usersLoading && (
              <div className="table-loading">
                <div className="loading-spinner" />
                <span>Loading users...</span>
              </div>
            )}
          </section>
        )}

        {/* Regular user message */}
        {user?.role !== 'admin' && (
          <section className="info-section">
            <div className="info-card">
              <span className="info-icon">🛒</span>
              <div>
                <h3>Start Shopping</h3>
                <p>
                  Explore thousands of products on ShopNest. Your orders and
                  wishlist will appear here once available.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
