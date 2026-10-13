import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export default function CareersView({ onNavigate }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(null);

  const fetchCareers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCareers(categoryFilter, searchQuery);
      setCareers(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to backend server. Make sure Spring Boot is running on port 8080.');
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, searchQuery]);

  useEffect(() => {
    let cancelled = false;

    api
      .getCareers(categoryFilter, searchQuery)
      .then((data) => {
        if (!cancelled) {
          setCareers(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.message ||
            'Unable to connect to backend server. Make sure Spring Boot is running on port 8080.'
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [categoryFilter, searchQuery]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCareers();
  };

  const categories = [
    { label: 'All Fields', value: '' },
    { label: 'Engineering & Technology', value: 'Engineering & Technology' },
    { label: 'Healthcare & Allied Health', value: 'Healthcare & Allied Health' },
    { label: 'Commerce & Finance', value: 'Commerce & Finance' },
    { label: 'Agriculture & Rural', value: 'Agriculture & Rural Development' },
    { label: 'Law & Judiciary', value: 'Law & Judiciary' },
    { label: 'Public Administration', value: 'Public Administration & Governance' },
    { label: 'Design & Arts', value: 'Design & Creative Arts' },
    { label: 'Aviation', value: 'Aviation & Aerospace' },
    { label: 'Defence', value: 'Defence & National Security' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Career Catalogue</span>
        <h1 className="section-title">Verified Career Opportunities</h1>
        <p className="section-subtitle">
          Explore careers across engineering, healthcare, civil services, commerce, design, and defence with verified education roadmaps.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <form onSubmit={handleSearchSubmit} className="filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by career title, keywords, skills (e.g. Software, Doctor, Law, Pilot)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select
            className="search-input"
            style={{ width: 'auto', minWidth: '200px', cursor: 'pointer' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </div>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading career pathways from Spring Boot backend...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="error-box">
          <h3>Failed to load career data</h3>
          <p style={{ margin: '0.5rem 0 1rem 0' }}>{error}</p>
          <button type="button" className="btn btn-secondary btn-sm" onClick={fetchCareers}>
            Try Again
          </button>
        </div>
      )}

      {/* Careers Grid */}
      {!loading && !error && (
        <div className="cards-grid">
          {careers.map((career) => (
            <div key={career.id} className="card">
              <div className="card-header">
                <div>
                  <span className="badge badge-pathway" style={{ marginBottom: '0.35rem' }}>
                    {career.category}
                  </span>
                  <h3 className="card-title">{career.title}</h3>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                📌 Stream Required: {career.streamRequired}
              </div>

              <p className="card-desc">
                {career.description}
              </p>

              <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
                <strong>Key Skills:</strong> {career.keySkills}
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => setSelectedCareer(career)}
                >
                  View Full Career Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && careers.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
          <h3>No careers match your search</h3>
          <p>Try searching with another keyword or resetting the category filter.</p>
        </div>
      )}

      {/* Career Details Modal */}
      {selectedCareer && (
        <div className="modal-overlay" onClick={() => setSelectedCareer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setSelectedCareer(null)}
            >
              ×
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-pathway" style={{ marginBottom: '0.5rem' }}>
                {selectedCareer.category}
              </span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--slate-900)' }}>
                {selectedCareer.title}
              </h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.25rem' }}>
                Stream: {selectedCareer.streamRequired}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>📖 Career Overview:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.description}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>🎯 Who Should Consider:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.whoShouldConsider}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>🛣️ Educational Route (After Class 10):</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.educationRoute}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>📋 Eligibility Criteria:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.eligibility}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>📝 Entrance Examinations:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.entranceExams}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>🎓 Degree Courses:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.possibleCourses}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>💼 Job Roles & Industries:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.careerOpportunities}</p>
              </div>

              <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>🏛️ Government Seat & Fee Reimbursement:</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-700)' }}>{selectedCareer.govSeatAndScholarshipInfo}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-600)', marginBottom: '0.25rem' }}>🚀 Higher Education Options:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedCareer.furtherStudyOptions}</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedCareer(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedCareer(null);
                  onNavigate('quiz');
                }}
              >
                Take Recommendation Quiz →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
