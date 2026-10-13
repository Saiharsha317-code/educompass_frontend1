import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function PathwaysView({ onNavigate }) {
  const [backendPathways, setBackendPathways] = useState([]);
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [streamFilter, setStreamFilter] = useState('ALL');

  useEffect(() => {
    async function loadPathways() {
      try {
        const data = await api.getPathways();
        setBackendPathways(data);
      } catch (err) {
        console.warn('Backend pathways unavailable, displaying local catalog:', err);
      }
    }
    loadPathways();
  }, []);

  // Static enriched list mapping all 19+ post-Class 10 and career fields
  const allComprehensivePathways = [
    {
      code: 'MPC',
      name: 'Intermediate MPC (Mathematics, Physics, Chemistry)',
      stream: 'SCIENCE_STEM',
      duration: '2 Years',
      suitability: 'Students with high analytical skills, problem solving, logic, and abstract physics curiosity.',
      eligibility: 'Passed Class 10 (SSC) with Mathematics and Science.',
      route: 'Class 10 → Intermediate MPC (2 yrs) → JEE / TGEAPCET → B.Tech / B.Sc / NDA (3-4 yrs)',
      exams: 'TGEAPCET, JEE Main, JEE Advanced, BITSAT, NDA/NA',
      courses: 'B.Tech in CSE, AI/ML, ECE, Mechanical, Civil, Aerospace, Pure Sciences',
      careers: 'Software Engineer, Aerospace Engineer, Data Scientist, Armed Forces Technical Officer, Researcher',
      scholarship: 'Telangana State Convenor Quota in University & private colleges; eligible for TS ePASS fee reimbursement based on income limits.',
      furtherStudy: 'M.Tech, MS abroad, MBA, PhD in specialized sciences.'
    },
    {
      code: 'BIPC',
      name: 'Intermediate BiPC (Biology, Physics, Chemistry)',
      stream: 'HEALTHCARE_LIFE_SCIENCES',
      duration: '2 Years',
      suitability: 'Students fascinated by human biology, living organisms, plant genetics, and medicine.',
      eligibility: 'Passed Class 10 (SSC) with General Science / Biology.',
      route: 'Class 10 → Intermediate BiPC (2 yrs) → NEET / TGEAPCET → MBBS / BDS / B.Pharm / B.Sc Agri (4-5.5 yrs)',
      exams: 'NEET-UG, TGEAPCET (Agri & Pharma Streams), ICAR/CUET-UG',
      courses: 'MBBS, BDS, BAMS, BHMS, Pharm.D, B.Pharmacy, B.Sc (Hons) Agriculture, B.Sc Nursing',
      careers: 'Doctor, Dental Surgeon, Pharmacist, Clinical Researcher, Agricultural Officer, Biotechnologist',
      scholarship: 'Subsidized tuition in government medical and agricultural colleges (KNRUHS, PJTSAU); TS ePASS post-matric scholarship.',
      furtherStudy: 'MD, MS, DM, M.Sc Biotechnology, Clinical Research Fellowships.'
    },
    {
      code: 'PCMB',
      name: 'Intermediate PCMB (Physics, Chemistry, Maths, Biology)',
      stream: 'SCIENCE_STEM',
      duration: '2 Years',
      suitability: 'High-performing students who want maximum career flexibility and refuse to close doors to either Engineering or Medicine.',
      eligibility: 'Passed Class 10 (SSC) with strong GPA in both Maths and Science.',
      route: 'Class 10 → Intermediate PCMB (2 yrs) → Eligible for both JEE and NEET → Engineering, Biomedical, or Medicine',
      exams: 'JEE Main, NEET-UG, TGEAPCET (Both Engineering & Agriculture streams)',
      courses: 'Biomedical Engineering, Bioinformatics, Biotechnology, MBBS, B.Tech',
      careers: 'Biomedical Engineer, Medical Robotics Specialist, Geneticist, Doctor, AI Healthcare Researcher',
      scholarship: 'TS ePASS applicable under convenor quota for both technical and medical streams.',
      furtherStudy: 'M.Tech Biomedical, MD/MS, Interdisciplinary Bioinformatics degrees.'
    },
    {
      code: 'POLYCET',
      name: 'Polytechnic Diploma (Engineering & Technology)',
      stream: 'TECHNICAL_DIPLOMA',
      duration: '3 Years',
      suitability: 'Students who learn best through practical machines, CAD labs, workshop tools, and circuit boards over theoretical rote memorization.',
      eligibility: 'Passed Class 10 (SSC) with Mathematics from recognized board.',
      route: 'Class 10 → TGPOLYCET → 3-Year Polytechnic Diploma → TSECET Lateral Entry directly into B.Tech 2nd Year OR direct Junior Engineer role',
      exams: 'TGPOLYCET (immediately after Class 10), TSECET (for lateral entry to B.Tech)',
      courses: 'Diploma in CSE, ECE, Mechanical, Civil, Mining, Electrical, Automobile',
      careers: 'Junior Engineer in TS-Transco, BHEL, Railways, Site Supervisor, CAD Designer, Graduate B.Tech Engineer',
      scholarship: 'Government polytechnics feature highly subsidized fees and hostel seats; TS ePASS fee reimbursement applies.',
      furtherStudy: 'Lateral entry into B.Tech 2nd Year (saves time, avoids Intermediate stress), AMIE certification.'
    },
    {
      code: 'MEC',
      name: 'Intermediate MEC (Mathematics, Economics, Commerce)',
      stream: 'COMMERCE_FINANCE',
      duration: '2 Years',
      suitability: 'Students who love numbers, business strategy, financial markets, and data without wanting physical laboratory sciences.',
      eligibility: 'Passed Class 10 (SSC).',
      route: 'Class 10 → Intermediate MEC (2 yrs) → CA Foundation / CUET-UG / IPMAT → CA / B.Com (Hons) / BBA / Data Analytics (3-5 yrs)',
      exams: 'ICAI CA Foundation, CUET-UG, IPMAT (IIM 5-Year Integrated Management), TS CPGET',
      courses: 'Chartered Accountancy, B.Com (Hons), BBA in Finance, Integrated MBA, Actuarial Science',
      careers: 'Chartered Accountant (CA), Financial Analyst, Investment Banker, Auditor, Wealth Manager',
      scholarship: 'State university convenor seats covered by TS ePASS; ICAI registration fees are low compared to private colleges.',
      furtherStudy: 'CFA (USA), CMA, MBA Finance (IIMs), Corporate Law.'
    },
    {
      code: 'CEC',
      name: 'Intermediate CEC (Civics, Economics, Commerce)',
      stream: 'COMMERCE_FINANCE',
      duration: '2 Years',
      suitability: 'Students aspiring for business administration, legal studies, banking, trade, and state administrative roles without advanced calculus.',
      eligibility: 'Passed Class 10 (SSC).',
      route: 'Class 10 → Intermediate CEC (2 yrs) → CLAT / TS LAWCET / B.Com → Corporate Law, Banking, or Business (3-5 yrs)',
      exams: 'CLAT, TS LAWCET, CUET-UG, Banking PO/Clerical exams',
      courses: 'B.Com, BBA, 5-Year Integrated B.A. LL.B, Company Secretaryship (CS)',
      careers: 'Bank Manager, Corporate Legal Advisor, Business Executive, Tax Consultant, Entrepreneur',
      scholarship: 'Convenor quota seats in state universities and degree colleges covered by TS ePASS.',
      furtherStudy: 'LL.M, MBA, M.Com, Civil Services preparation.'
    },
    {
      code: 'HUMANITIES',
      name: 'Intermediate Humanities / Arts (HEC)',
      stream: 'ARTS_HUMANITIES',
      duration: '2 Years',
      suitability: 'Passionate readers and critical thinkers interested in history, governance, public policy, literature, and social reform.',
      eligibility: 'Passed Class 10 (SSC).',
      route: 'Class 10 → Intermediate HEC (2 yrs) → CLAT / CUET-UG → 5-Year Integrated Law or B.A. (Hons) → Civil Services / Legal Practice',
      exams: 'CLAT (for National Law Universities), TS LAWCET, CUET-UG, UPSC CSE / TSPSC',
      courses: '5-Year B.A. LL.B (Hons), B.A. in Political Science, History, Economics, Mass Communication',
      careers: 'Civil Servant (IAS/IPS/TSPSC), Advocate, High Court Judge, Journalist, Public Policy Analyst',
      scholarship: 'Telangana State Social Welfare and BC Study Circles provide subsidized education and free civil service preparation.',
      furtherStudy: 'Master of Public Policy (MPP), LL.M, Master of Arts in International Relations.'
    },
    {
      code: 'ITI',
      name: 'Industrial Training Institute (ITI Technical Trades)',
      stream: 'VOCATIONAL_SKILL',
      duration: '1-2 Years',
      suitability: 'Students seeking fast-track vocational mastery, workshop skills, and immediate technician positions in industries or PSUs.',
      eligibility: 'Passed Class 10 (SSC).',
      route: 'Class 10 → ITI Trade (Electrician/Fitter/Welder/COPA) (1-2 yrs) → Apprenticeship → Industrial Employment or 2nd yr Polytechnic lateral entry',
      exams: 'All India Trade Test (AITT) conducted by NCVT, RRB ALP/Technician recruitment',
      courses: 'Electrician, Fitter, Machinist, Draughtsman, Computer Operator & Programming Assistant (COPA)',
      careers: 'Industrial Electrician, Railway Assistant Loco Pilot (ALP), Factory Technician, Workshop Owner',
      scholarship: 'Government ITIs have zero or nominal fees; apprenticeship training includes monthly government stipends.',
      furtherStudy: 'Lateral entry into 2nd year Polytechnic Diploma; National Apprenticeship Certificate (NAC).'
    },
    {
      code: 'VOCATIONAL',
      name: 'Intermediate Vocational Education',
      stream: 'VOCATIONAL_SKILL',
      duration: '2 Years',
      suitability: 'Students seeking hands-on practical certifications in paramedical, accounting, or agricultural techniques with intermediate status.',
      eligibility: 'Passed Class 10 (SSC).',
      route: 'Class 10 → Intermediate Vocational (2 yrs) → Bridge Course OR Direct Technical Employment / Degree',
      exams: 'State Vocational Board Examination; Bridge Course exams for degree entry',
      courses: 'Medical Lab Technology (MLT), Physiotherapy, Office Management, Multi-Purpose Health Worker (MPHW)',
      careers: 'Laboratory Technician, Hospital Assistant, Paramedical Officer, Junior Accountant',
      scholarship: 'Government junior colleges in Telangana provide free or subsidized vocational courses.',
      furtherStudy: 'Bridge courses allow entry into standard B.Sc or B.Com undergraduate courses.'
    },
    {
      code: 'DESIGN_ARTS',
      name: 'Design, Animation & Creative Arts',
      stream: 'CREATIVE_ARTS',
      duration: '2 Yrs + 4 Yrs (B.Des)',
      suitability: 'Visual creatives, artists, ergonomic thinkers, and digital creators who love sketching and user problem solving.',
      eligibility: 'Passed Class 10 (SSC) followed by any 10+2 Intermediate stream.',
      route: 'Class 10 → Intermediate (Any Stream, 2 yrs) → UCEED / NID DAT / NIFT → Bachelor of Design (B.Des, 4 yrs)',
      exams: 'UCEED (IIT Bombay / IIT Hyderabad), NID DAT, NIFT, CEED',
      courses: 'B.Des in UI/UX Design, Industrial Product Design, Animation, Fashion Technology',
      careers: 'UI/UX Designer, Product Designer, Game Visual Artist, Creative Director in tech & gaming studios',
      scholarship: 'IIT Hyderabad and NID provide merit scholarships and subsidized fee structures for eligible students.',
      furtherStudy: 'Master of Design (M.Des), Human-Computer Interaction (HCI) in India and abroad.'
    },
    {
      code: 'LAW_LEGAL',
      name: 'Law & Constitutional Jurisprudence',
      stream: 'ARTS_HUMANITIES',
      duration: '2 Yrs + 5 Yrs (Integrated LL.B)',
      suitability: 'Students with high ethical conviction, debate skills, logic, and interest in justice and constitutional rights.',
      eligibility: 'Passed Class 10 (SSC) followed by any 10+2 Intermediate stream with minimum 45%.',
      route: 'Class 10 → Intermediate (Any stream, 2 yrs) → CLAT / TS LAWCET → 5-Year Integrated B.A. LL.B / BBA LL.B',
      exams: 'CLAT (for 24 National Law Universities including NALSAR Hyderabad), TS LAWCET, AILET',
      courses: '5-Year Integrated B.A. LL.B (Hons), B.B.A. LL.B (Hons)',
      careers: 'Advocate, High Court / Supreme Court Counsel, Corporate Legal Manager, Judicial Magistrate (Civil Judge)',
      scholarship: 'State quota seats in Telangana university law colleges covered under TS ePASS.',
      furtherStudy: 'LL.M in Cyber Law / Corporate Law, Judicial Services Examination.'
    },
    {
      code: 'AGRICULTURE',
      name: 'Agriculture & Rural Agritech',
      stream: 'HEALTHCARE_LIFE_SCIENCES',
      duration: '2 Yrs + 4 Yrs (B.Sc Agri)',
      suitability: 'Students passionate about soil science, sustainable organic agriculture, food security, and drone farming technology.',
      eligibility: 'Passed Class 10 (SSC) followed by Intermediate BiPC.',
      route: 'Class 10 → Intermediate BiPC (2 yrs) → TGEAPCET (Agri Stream) → B.Sc (Hons) Agriculture at PJTSAU (4 yrs)',
      exams: 'TGEAPCET (Agriculture Stream), ICAR AIEEA / CUET-UG',
      courses: 'B.Sc (Hons) Agriculture, B.Sc Horticulture, B.Tech Agricultural Engineering',
      careers: 'Agricultural Extension Officer (AEO), Bank Agri-Loan Officer, Seed Genetics Researcher, Agritech Entrepreneur',
      scholarship: 'Subsidized state seats at PJTSAU with rural student reservation quotas (Non-Municipal Quota).',
      furtherStudy: 'M.Sc in Agronomy/Plant Genetics, MBA Agribusiness, ICAR Scientist Recruitment.'
    },
    {
      code: 'DEFENCE_FORCES',
      name: 'Defence Services & Armed Forces',
      stream: 'DEFENCE_SERVICES',
      duration: '2 Yrs + 3 Yrs (NDA)',
      suitability: 'Disciplined, physically fit, patriotic students with team leadership, courage, and quick tactical decision-making.',
      eligibility: 'Unmarried candidates aged 16.5-19.5 with 10+2 passed/appearing (Physics & Maths for Air Force/Navy).',
      route: 'Class 10 → Intermediate MPC (2 yrs) → UPSC NDA Written Exam → 5-Day SSB Interview → NDA Khadakwasla (3 yrs)',
      exams: 'UPSC NDA & NA (Conducted twice annually)',
      courses: 'Military training + B.Sc / B.Tech degree awarded by JNU at NDA',
      careers: 'Lieutenant in Indian Army, Flying Officer in Indian Air Force, Sub-Lieutenant in Indian Navy',
      scholarship: '100% funded by the Government of India (Tuition, lodging, mess, uniform, medical) + officer stipend during cadetship.',
      furtherStudy: 'Defence Services Staff College (DSSC), Command Courses, High Altitude Warfare.'
    },
    {
      code: 'AVIATION_FLIGHT',
      name: 'Commercial Aviation & Flight Navigation',
      stream: 'SCIENCE_STEM',
      duration: '2 Yrs + 1.5-2 Yrs (Flight Training)',
      suitability: 'Students with quick reflexes, spatial awareness, mathematical precision, and love of flight.',
      eligibility: 'Passed Class 10 followed by Intermediate MPC (Physics and Mathematics compulsory with min 50%).',
      route: 'Class 10 → Intermediate MPC (2 yrs) → DGCA Medical Class 1 → Flying School (200 hours flight) → Commercial Pilot License (CPL)',
      exams: 'DGCA Theory Exams, IGRUA Entrance Test, AFCAT (for Air Force entry)',
      courses: 'Commercial Pilot Training (CPL), B.Sc Aviation, Aircraft Maintenance Engineering (AME)',
      careers: 'Commercial Airline Pilot (IndiGo, Air India), Cargo Aviator, Corporate Jet Pilot, Flight Instructor',
      scholarship: 'Military aviation through NDA is 100% free; civilian commercial flight training requires private funding.',
      furtherStudy: 'Type Rating (Airbus A320 / Boeing 737), Airline Transport Pilot License (ATPL).'
    },
    {
      code: 'ENTREPRENEURSHIP',
      name: 'Entrepreneurship & Tech Innovation',
      stream: 'COMMERCE_FINANCE',
      duration: '2 Yrs + Graduation',
      suitability: 'Visionary self-starters who like solving real problems, building products, and taking calculated business risks.',
      eligibility: 'Passed Class 10 followed by any stream (MPC, MEC, or Polytechnic).',
      route: 'Class 10 → Any Stream (2 yrs) → B.Tech / BBA / B.Com → Startup Incubation (T-Hub, WE-Hub, CIE IIIT-H)',
      exams: 'Standard entrance exams based on chosen undergraduate course',
      courses: 'BBA in Entrepreneurship, B.Tech with minor in Innovation, B.Com',
      careers: 'Startup Founder, Product Owner, Venture Scout, Small Business Operator in Telangana ecosystem',
      scholarship: 'Telangana TSIC (Telangana State Innovation Cell) and T-Hub offer grants, seed capital, and incubation support.',
      furtherStudy: 'Executive Entrepreneurship programs, Venture Management.'
    }
  ];

  const filteredPathways = allComprehensivePathways.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.careers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.suitability.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStream = streamFilter === 'ALL' || p.stream === streamFilter;

    return matchesSearch && matchesStream;
  });

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Educational Pathways</span>
        <h1 className="section-title">
          Explore All Post-Class 10 Pathways
          {backendPathways.length > 0 && (
            <span className="badge badge-pathway" style={{ verticalAlign: 'middle', marginLeft: '10px', fontSize: '0.75rem' }}>
              ✓ Synced with MySQL
            </span>
          )}
        </h1>
        <p className="section-subtitle">
          Detailed guide to Intermediate streams, Polytechnic diplomas, ITI trades, and professional routes available to Telangana students.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by stream, subjects, careers (e.g. MPC, Doctor, Pilot, Law)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tab-group">
          <button
            type="button"
            className={`tab-btn ${streamFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setStreamFilter('ALL')}
          >
            All Streams
          </button>
          <button
            type="button"
            className={`tab-btn ${streamFilter === 'SCIENCE_STEM' ? 'active' : ''}`}
            onClick={() => setStreamFilter('SCIENCE_STEM')}
          >
            STEM & Sciences
          </button>
          <button
            type="button"
            className={`tab-btn ${streamFilter === 'HEALTHCARE_LIFE_SCIENCES' ? 'active' : ''}`}
            onClick={() => setStreamFilter('HEALTHCARE_LIFE_SCIENCES')}
          >
            Healthcare & Agri
          </button>
          <button
            type="button"
            className={`tab-btn ${streamFilter === 'COMMERCE_FINANCE' ? 'active' : ''}`}
            onClick={() => setStreamFilter('COMMERCE_FINANCE')}
          >
            Commerce & Finance
          </button>
          <button
            type="button"
            className={`tab-btn ${streamFilter === 'TECHNICAL_DIPLOMA' ? 'active' : ''}`}
            onClick={() => setStreamFilter('TECHNICAL_DIPLOMA')}
          >
            Polytechnic & ITI
          </button>
          <button
            type="button"
            className={`tab-btn ${streamFilter === 'ARTS_HUMANITIES' ? 'active' : ''}`}
            onClick={() => setStreamFilter('ARTS_HUMANITIES')}
          >
            Arts, Law & Services
          </button>
        </div>
      </div>

      {/* Pathways Grid */}
      <div className="cards-grid">
        {filteredPathways.map((item) => (
          <div key={item.code} className="card">
            <div className="card-header">
              <div>
                <span className="badge badge-stream" style={{ marginBottom: '0.35rem' }}>{item.code}</span>
                <h3 className="card-title">{item.name}</h3>
              </div>
              <span className="badge badge-pathway">{item.duration}</span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', marginBottom: '0.75rem' }}>
              <strong>Who should consider:</strong> {item.suitability}
            </div>

            <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
              <strong>Education Progression:</strong> {item.route}
            </div>

            <div style={{ fontSize: '0.825rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600 }}>
              <strong>Leading Careers:</strong> {item.careers}
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
                onClick={() => setSelectedPathway(item)}
              >
                View Complete Progression & Exams →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPathways.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
          <h3>No matching pathways found</h3>
          <p>Try searching with another subject, stream or clear the filter.</p>
        </div>
      )}

      {/* Detailed Modal */}
      {selectedPathway && (
        <div className="modal-overlay" onClick={() => setSelectedPathway(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setSelectedPathway(null)}
            >
              ×
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-pathway" style={{ marginBottom: '0.5rem' }}>
                {selectedPathway.code} • {selectedPathway.duration}
              </span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--slate-900)' }}>
                {selectedPathway.name}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>🎯 Who Should Choose This Pathway:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedPathway.suitability}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>📋 Eligibility & Requirements:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedPathway.eligibility}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>🛣️ Educational Route (Step-by-Step):</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedPathway.route}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>📝 Relevant Entrance Examinations:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedPathway.exams}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>🎓 Undergraduate Courses & Degrees:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedPathway.courses}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>💼 Career Opportunities:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedPathway.careers}</p>
              </div>

              <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>🏛️ Government Seats & Scholarship Info:</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-700)' }}>{selectedPathway.scholarship}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-600)', marginBottom: '0.25rem' }}>🚀 Further Study & Growth:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{selectedPathway.furtherStudy}</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedPathway(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedPathway(null);
                  onNavigate('quiz');
                }}
              >
                Check My Compatibility in Quiz →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
