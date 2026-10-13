import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/pathways', label: 'Explore Pathways' },
    { path: '/careers', label: 'Career Catalogue' },
    { path: '/quiz', label: 'Career Quiz' },
    { path: '/exams', label: 'Entrance Exams' },
    { path: '/scholarships', label: 'Govt Seats & Scholarships' },
    { path: '/preparation', label: 'Career Prep' },
    { path: '/forum', label: 'Discussion Forum' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link
          to="/"
          className="brand"
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="brand-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <span>EduCompass</span>
          <span className="brand-tag">Telangana</span>
        </Link>

        <button
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  className={`nav-btn ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}

            {user ? (
              <>
                <li>
                  <button
                    type="button"
                    className={`nav-btn ${isActive('/dashboard') ? 'active' : ''}`}
                    onClick={() => handleNavClick('/dashboard')}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`nav-btn ${isActive('/profile') ? 'active' : ''}`}
                    onClick={() => handleNavClick('/profile')}
                  >
                    👤 {user.name?.split(' ')[0] || 'Profile'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleLogout}
                    style={{
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={`btn btn-primary btn-sm ${location.pathname === '/login' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>🔑</span> Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
