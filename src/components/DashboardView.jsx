import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function DashboardView() {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Student Hub</span>
        <h1 className="section-title">
          Welcome back{user?.name ? `, ${user.name}` : ''}!
        </h1>
        <p className="section-subtitle">
          Manage your career guidance progress, saved career pathways, and quiz assessments.
        </p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">⭐ Saved Careers & Pathways</h3>
          </div>
          <p className="card-desc">
            View your bookmarked careers, entrance exams, and tailored pathway routes.
          </p>
          <Link to="/saved-careers" className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }}>
            View Saved Items →
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📝 Career Quiz Assessment</h3>
          </div>
          <p className="card-desc">
            Explore rule-based career recommendations and update your subject strengths.
          </p>
          <Link to="/quiz" className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }}>
            Take Career Quiz →
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">💬 Telangana Community Forum</h3>
          </div>
          <p className="card-desc">
            Ask admission questions, discuss intermediate vs polytechnic, and help fellow students.
          </p>
          <Link to="/forum" className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }}>
            Visit Discussion Forum →
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">👤 Profile Settings</h3>
          </div>
          <p className="card-desc">
            Manage your personal profile, email, and authentication credentials.
          </p>
          <Link to="/profile" className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }}>
            Edit Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
