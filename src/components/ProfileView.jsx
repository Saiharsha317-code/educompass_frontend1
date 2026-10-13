import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ProfileView() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const startEditing = () => {
    setName(user?.name || '');
    setIsEditing(true);
    setStatusMessage(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const trimmed = name.trim();
    if (!trimmed || trimmed.length < 2) {
      setStatusMessage({
        type: 'error',
        text: 'Display name must be at least 2 characters long.'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({ name: trimmed });
      setIsEditing(false);
      setStatusMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.data?.message || err.message || 'Failed to update profile.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await logout();
      navigate('/');
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.25rem', maxWidth: '680px', margin: '0 auto' }}>
      <div className="section-header">
        <span className="section-pill">Account Settings</span>
        <h1 className="section-title">Student Profile</h1>
        <p className="section-subtitle">
          Manage your personal details, guidance settings, and account security.
        </p>
      </div>

      {statusMessage && (
        <div
          className="auth-notice-box"
          role="alert"
          style={{
            marginBottom: '1.5rem',
            background: statusMessage.type === 'error' ? '#fef2f2' : '#f0fdf4',
            borderColor: statusMessage.type === 'error' ? '#fecaca' : '#bbf7d0',
            color: statusMessage.type === 'error' ? '#991b1b' : '#166534'
          }}
        >
          <span>{statusMessage.type === 'error' ? '⚠️' : '✓'}</span>
          <div>{statusMessage.text}</div>
        </div>
      )}

      <div className="card" style={{ padding: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--slate-200)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              fontWeight: 700
            }}
          >
            🎓
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-900)', margin: 0 }}>
              {user?.name || 'EduCompass Student'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: '0.25rem 0 0' }}>
              {user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Class 10 Student Account (Telangana)'}
            </p>
          </div>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
              Full Name:
            </label>
            {isEditing ? (
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                required
              />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--slate-50)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <span style={{ fontWeight: 500, color: 'var(--slate-900)' }}>{user?.name}</span>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={startEditing}
                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                >
                  Edit Name
                </button>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
              Email Address:
            </label>
            <div style={{ background: 'var(--slate-50)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
              {user?.email}
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--slate-400)' }}>(Primary login credential)</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                Authentication Provider:
              </label>
              <div style={{ background: 'var(--slate-50)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', color: 'var(--slate-700)', fontSize: '0.875rem' }}>
                {user?.authProvider === 'GOOGLE' ? '🌐 Google OAuth' : '🔒 Password Authentication'}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                Account Security:
              </label>
              <div style={{ background: 'var(--slate-50)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', color: '#166534', fontSize: '0.875rem', fontWeight: 500 }}>
                🛡️ HttpOnly Cookie Session
              </div>
            </div>
          </div>

          {isEditing && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setName(user?.name || '');
                  setIsEditing(false);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        <div style={{ borderTop: '1px solid var(--slate-200)', marginTop: '2rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/dashboard" className="btn btn-secondary btn-sm">
              Dashboard
            </Link>
            <Link to="/saved-careers" className="btn btn-outline btn-sm">
              Saved Items
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleLogout}
            style={{ color: '#dc2626', borderColor: '#fca5a5' }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
