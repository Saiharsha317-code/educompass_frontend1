import { Link } from 'react-router-dom';

export default function SavedCareersView() {
  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">My Collection</span>
        <h1 className="section-title">Saved Careers & Pathways</h1>
        <p className="section-subtitle">
          Keep track of careers and educational pathways you are considering after Class 10.
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
          No Saved Careers Yet
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Browse our career catalogue or pathway guides and click the save button to bookmark careers for quick reference.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Link to="/careers" className="btn btn-primary btn-sm">Explore Careers</Link>
          <Link to="/pathways" className="btn btn-secondary btn-sm">Explore Pathways</Link>
          <Link to="/dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
