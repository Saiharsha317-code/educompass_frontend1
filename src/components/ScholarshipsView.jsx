

export default function ScholarshipsView() {
  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Financial Guidance</span>
        <h1 className="section-title">Government Seats, Quotas & Financial Support</h1>
        <p className="section-subtitle">
          Essential insights into Convenor Quota, TS ePASS Fee Reimbursement, government universities, and realistic financial planning for Class 10 families in Telangana.
        </p>
      </div>

      {/* Reality Check Alert Banner */}
      <div className="notice-box" style={{ background: '#fff7ed', borderColor: '#fdba74' }}>
        <div className="notice-icon" style={{ color: '#ea580c' }}>⚠️</div>
        <div className="notice-text" style={{ color: '#9a3412' }}>
          <strong>The "Free Seat" Myth vs Reality:</strong> Many students and parents in Telangana believe that getting a rank in TGEAPCET or TGPOLYCET automatically awards a "free seat." In reality, government fee reimbursement is determined by welfare department rules, family income certificates, convenor quota allotment, and institution fee caps. An entrance rank qualifies you for admission counseling, not an unconditional waiver of costs.
        </div>
      </div>

      {/* Key Concepts Grid */}
      <div className="cards-grid" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🏛️ Government Institutions</h3>
            <span className="badge badge-pathway">High Subsidy</span>
          </div>
          <p className="card-desc">
            Colleges directly run and funded by the Telangana Government (e.g., Osmania University, JNTU Hyderabad, Kakatiya University, Government Polytechnics, Government Medical Colleges).
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <strong>Tuition Fee Level:</strong> Highly nominal (often ₹2,000 – ₹10,000/year for diploma & engineering; minimal for degree). Hostels and mess charges are partially subsidized.
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🎟️ Convenor Quota (Category A)</h3>
            <span className="badge badge-admission">Merit Allocation</span>
          </div>
          <p className="card-desc">
            Typically 70% of seats in private colleges and 100% of seats in university colleges are filled via centralized government web counseling (TSCHE/SBTET) based purely on entrance exam rank and reservation category.
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <strong>Key Requirement:</strong> Mandatory to be admitted through Convenor Quota to qualify for government scholarships and fee reimbursement.
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">💵 Management Quota (Category B & C)</h3>
            <span className="badge badge-recruitment">Private Quota</span>
          </div>
          <p className="card-desc">
            Typically 30% of seats in private engineering and professional colleges. Filled directly by college managements without government counseling rank cutoffs.
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <strong>Scholarship Rule:</strong> <em>Strictly ineligible</em> for government fee reimbursement or TS ePASS scholarships, regardless of family income.
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">💳 TS ePASS Fee Reimbursement</h3>
            <span className="badge badge-pathway">Post-Matric Scheme</span>
          </div>
          <p className="card-desc">
            Telangana Electronic Payment and Application System of Scholarships. Under this welfare scheme, tuition fees are directly reimbursed to colleges for eligible students.
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <strong>Key Criteria:</strong> Annual family income limits verified through MeeSeva income certificate, category criteria, and minimum 75% college attendance.
          </div>
        </div>
      </div>

      {/* TS ePASS Detailed Guidelines */}
      <div style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '3rem', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--slate-900)', marginBottom: '1rem' }}>
          Understanding TS ePASS Post-Matric Scholarship Requirements
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>1. Allotment Order</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              The student must hold an official provisional allotment order issued through centralized state counseling (e.g. TGEAPCET, TGPOLYCET, TS ICET, TS EDCET). Direct walk-in admissions are not covered.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>2. Income & Caste Verification</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              Family annual income must not exceed prescribed department limits (e.g., typically ₹2,00,000 for SC/ST and ₹1,50,000 for BC/EBC in rural areas / ₹2,00,000 in urban areas, as defined by latest government orders).
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>3. Mandatory Attendance (75%)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              Biometric attendance is linked to scholarship disbursement. Colleges must record minimum 75% student attendance for scholarship renewal every academic semester.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>4. College Fee Cap Differences</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: '1.6' }}>
              In private engineering colleges, government reimbursement may cover standard prescribed tuition fees up to ₹35,000 or full fees depending on rank thresholds (e.g. ranks below 10,000 in TGEAPCET for certain categories) and latest government notification.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Checklist for Class 10 Parents */}
      <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--slate-900)', marginBottom: '1rem' }}>
          Checklist for Parents & Students Before Paying Admission Fees:
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem', color: 'var(--slate-700)' }}>
          <li>
            <strong>Ask clearly about seat type:</strong> Always confirm whether the college is offering admission under Convenor Quota (counseling code) or Management Quota.
          </li>
          <li>
            <strong>Keep caste & income certificates updated:</strong> Issued by Telangana Revenue Department via MeeSeva within the valid financial year.
          </li>
          <li>
            <strong>Polytechnic vs Intermediate cost:</strong> Government Polytechnic colleges offer total annual tuition around ₹3,800 to ₹5,000, making them significantly more economical than private Intermediate coaching institutes which often charge upwards of ₹1,00,000 to ₹2,50,000 annually.
          </li>
          <li>
            <strong>Always check the official website:</strong> Apply and verify scholarship status directly on <a href="https://telanganaepass.cgg.gov.in" target="_blank" rel="noopener noreferrer">telanganaepass.cgg.gov.in</a> rather than relying on unverified broker claims.
          </li>
        </ul>
      </div>
    </div>
  );
}
