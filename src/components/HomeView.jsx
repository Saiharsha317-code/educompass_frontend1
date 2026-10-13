
export default function HomeView({ onNavigate }) {
  const pathwayHighlights = [
    {
      code: 'MPC',
      name: 'Intermediate MPC',
      desc: 'Maths, Physics & Chemistry. Premier route for Engineering (B.Tech), Pure Sciences, Defence (NDA), Architecture, and Computing.',
      duration: '2 Years',
      target: 'Analytical & STEM minds'
    },
    {
      code: 'BIPC',
      name: 'Intermediate BiPC',
      desc: 'Biology, Physics & Chemistry. Direct gateway to MBBS, BDS, Pharmacy, Agriculture (PJTSAU), Biotechnology, and Allied Healthcare.',
      duration: '2 Years',
      target: 'Medical & Life Sciences'
    },
    {
      code: 'POLYCET',
      name: 'Polytechnic Diploma',
      desc: 'Applied 3-year technical engineering diploma immediately after Class 10 with lateral entry into 2nd year B.Tech via TSECET.',
      duration: '3 Years',
      target: 'Hands-on practical learners'
    },
    {
      code: 'MEC',
      name: 'Intermediate MEC',
      desc: 'Maths, Economics & Commerce. Prestigious stepping stone for Chartered Accountancy (CA), Data Finance, CFA, and Corporate Strategy.',
      duration: '2 Years',
      target: 'Numbers & Business strategy'
    },
    {
      code: 'CEC',
      name: 'Intermediate CEC',
      desc: 'Civics, Economics & Commerce. Strong corporate foundation for Commerce, Banking, Law (CLAT), and State Civil Services.',
      duration: '2 Years',
      target: 'Business, Law & Governance'
    },
    {
      code: 'HUMANITIES',
      name: 'Intermediate Arts / HEC',
      desc: 'History, Economics & Civics. Supreme critical foundation for 5-Year Integrated Law (CLAT), Civil Services (UPSC/TSPSC), and Journalism.',
      duration: '2 Years',
      target: 'Policy, Law & Social impact'
    },
    {
      code: 'ITI',
      name: 'Industrial Training (ITI)',
      desc: '1-2 year technical skill certification under NCVT for direct technician roles in Indian Railways, PSUs (BHEL, TS-Transco), and industries.',
      duration: '1-2 Years',
      target: 'Fast-track technical careers'
    },
    {
      code: 'VOCATIONAL',
      name: 'Vocational Education',
      desc: 'Applied paramedical, accounting, or agricultural trades providing intermediate certificates with immediate employability.',
      duration: '2 Years',
      target: 'Job-oriented skill development'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-pill">
              <span>🧭</span> Telangana Class 10 Career Navigation
            </div>
            <h1 className="hero-title">
              Your Future After Class 10 is <span>Bigger Than Just MPC or BiPC</span>
            </h1>
            <p className="hero-subtitle">
              Career selection after Class 10 shouldn't feel like a high-stakes gamble. EduCompass helps Telangana students, parents, and teachers explore educational pathways, entrance examinations, convenor quotas, and verified career routes.
            </p>

            <div className="hero-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => onNavigate('quiz')}
              >
                <span>✨</span> Find My Career Path (Quiz)
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => onNavigate('pathways')}
              >
                <span>🗺️</span> Explore Career Paths
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => onNavigate('exams')}
              >
                <span>📝</span> Entrance Exams
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-num">8+</div>
                <div className="stat-label">Core Post-Class 10 Streams</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">14+</div>
                <div className="stat-label">State & National Exams</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">19+</div>
                <div className="stat-label">Career Fields Mapped</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">100%</div>
                <div className="stat-label">Transparent Rule-Based Guidance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Reassurance Section */}
      <section style={{ padding: '3.5rem 0', background: 'white', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Why EduCompass</span>
            <h2 className="section-title">Multiple Valid Paths to Success</h2>
            <p className="section-subtitle">
              In Telangana, thousands of students mistakenly believe only Intermediate MPC or BiPC lead to respected careers. The truth is that Polytechnic, MEC, CEC, ITI, and Humanities offer vibrant, high-growth, fulfilling avenues.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                🛠️ Polytechnic with Lateral Entry
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                Prefer hands-on workshops over heavy theory? A 3-year Polytechnic Diploma through TGPOLYCET lets you enter 2nd year B.Tech via TSECET without the pressure of 2 years of Intermediate coaching.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                💼 Commerce & Financial Acumen
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                MEC and CEC streams provide the direct launchpad to Chartered Accountancy (CA), Investment Banking, Corporate Law, and Business Analytics with manageable stress and tremendous corporate growth.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                🏛️ Law, Civil Services & Public Policy
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                Arts and Humanities foster reading endurance, critical argumentation, and deep social understanding — creating the premier foundation for CLAT (Law) and UPSC / TSPSC Civil Services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways Overview Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Educational Pathways</span>
            <h2 className="section-title">Options Available Immediately After Class 10</h2>
            <p className="section-subtitle">
              Every stream has unique subject combinations, learning formats, and career outcomes. Choose based on your natural strengths and interests.
            </p>
          </div>

          <div className="cards-grid">
            {pathwayHighlights.map((path) => (
              <div key={path.code} className="card">
                <div className="card-header">
                  <h3 className="card-title">{path.name}</h3>
                  <span className="badge badge-pathway">{path.duration}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  🎯 Best for: {path.target}
                </div>
                <p className="card-desc">{path.desc}</p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => onNavigate('pathways')}
                >
                  View Pathway Details →
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate('pathways')}
            >
              Explore All 19+ Pathways & Detailed Progression Routes →
            </button>
          </div>
        </div>
      </section>

      {/* Notice / Govt Guidance Banner */}
      <section style={{ padding: '2rem 0', background: 'white' }}>
        <div className="container">
          <div className="notice-box">
            <div className="notice-icon">ℹ️</div>
            <div className="notice-text">
              <strong>Telangana Government Seats & Scholarship Advisory:</strong> An entrance rank in TGEAPCET or TGPOLYCET does not automatically mean free education. Subsidized tuition and TS ePASS fee reimbursement depend strictly on Convenor Quota allotment, category, family income certificates, and official government rules. Always verify current guidelines on the official TS ePASS portal.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
