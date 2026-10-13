import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export default function ExamsView() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL'); // ALL, ADMISSION, EMPLOYMENT_RECRUITMENT
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState(null);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const categoryParam = activeCategory === 'ALL' ? '' : activeCategory;
      const data = await api.getExams(categoryParam, '', searchQuery);
      setExams(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to backend server on port 8080.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    let cancelled = false;

    api
      .getExams(
        activeCategory === 'ALL' ? '' : activeCategory,
        '',
        searchQuery
      )
      .then((data) => {
        if (!cancelled) {
          setExams(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.message || 'Unable to connect to backend server on port 8080.'
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeCategory, searchQuery]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchExams();
  };

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Examinations Catalogue</span>
        <h1 className="section-title">Entrance & Recruitment Examinations</h1>
        <p className="section-subtitle">
          Searchable, verified catalogue distinguishing academic college admission examinations from government employment and recruitment drives.
        </p>
      </div>

      {/* Advisory Banner */}
      <div className="notice-box">
        <div className="notice-icon">📢</div>
        <div className="notice-text">
          <strong>Important Clarification:</strong> College admission examinations (like TGEAPCET, TGPOLYCET, JEE, NEET) grant entry into educational institutions. In contrast, recruitment examinations (like TSPSC, UPSC, SSC, Banking, Railways) are employment drives for government posts. Annual examination schedules, application dates, and syllabus notifications are issued by their respective convening authorities.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search exams (e.g. TGEAPCET, POLYCET, NEET, TSPSC, UPSC, Banking)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="tab-group">
          <button
            type="button"
            className={`tab-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ALL')}
          >
            All Examinations
          </button>
          <button
            type="button"
            className={`tab-btn ${activeCategory === 'ADMISSION' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ADMISSION')}
          >
            🎓 College Admissions
          </button>
          <button
            type="button"
            className={`tab-btn ${activeCategory === 'EMPLOYMENT_RECRUITMENT' ? 'active' : ''}`}
            onClick={() => setActiveCategory('EMPLOYMENT_RECRUITMENT')}
          >
            💼 Employment & Recruitment
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Fetching verified examination data from backend...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="error-box">
          <h3>Failed to load examinations</h3>
          <p style={{ margin: '0.5rem 0 1rem 0' }}>{error}</p>
          <button type="button" className="btn btn-secondary btn-sm" onClick={fetchExams}>
            Try Again
          </button>
        </div>
      )}

      {/* Examinations Grid */}
      {!loading && !error && (
        <div className="cards-grid">
          {exams.map((exam) => (
            <div key={exam.id} className="card">
              <div className="card-header">
                <div>
                  <span className={`badge ${exam.category === 'ADMISSION' ? 'badge-admission' : 'badge-recruitment'}`} style={{ marginBottom: '0.35rem' }}>
                    {exam.category === 'ADMISSION' ? 'College Admission' : 'Employment Recruitment'}
                  </span>
                  <h3 className="card-title" style={{ fontSize: '1.15rem' }}>{exam.name}</h3>
                </div>
              </div>

              <div style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                🎯 Target Field: {exam.targetField}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '0.75rem' }}>
                ⏳ Applicable Stage: <strong>{exam.applicableStage}</strong>
              </div>

              <p className="card-desc" style={{ fontSize: '0.875rem' }}>
                {exam.examPurpose}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => setSelectedExam(exam)}
                >
                  View Details →
                </button>
                {exam.officialLink && (
                  <a
                    href={exam.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    title="Open official portal"
                  >
                    Official Portal ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && exams.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
          <h3>No examinations found matching your filter</h3>
          <p>Try searching with another keyword or resetting the category tabs.</p>
        </div>
      )}

      {/* Examination Detail Modal */}
      {selectedExam && (
        <div className="modal-overlay" onClick={() => setSelectedExam(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setSelectedExam(null)}
            >
              ×
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span className={`badge ${selectedExam.category === 'ADMISSION' ? 'badge-admission' : 'badge-recruitment'}`} style={{ marginBottom: '0.5rem' }}>
                {selectedExam.category === 'ADMISSION' ? 'College Admission Examination' : 'Government Employment & Recruitment Drive'}
              </span>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--slate-900)' }}>
                {selectedExam.name}
              </h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.25rem' }}>
                Field: {selectedExam.targetField} • {selectedExam.applicableStage}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>🎯 Examination Purpose & Scope:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedExam.examPurpose}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>📋 Eligibility Criteria:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedExam.eligibility}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>📝 Pattern & Subject Format:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedExam.examPattern}</p>
              </div>

              <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-800)', marginBottom: '0.25rem' }}>🔍 Verification Status:</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>{selectedExam.verificationStatus}</p>
              </div>

              {selectedExam.notes && (
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-amber)', marginBottom: '0.25rem' }}>💡 Important Notes:</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-700)' }}>{selectedExam.notes}</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedExam(null)}
              >
                Close
              </button>
              {selectedExam.officialLink && (
                <a
                  href={selectedExam.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Visit Official Examination Portal ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
