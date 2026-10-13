import { useState } from 'react';
import { api } from '../services/api';

export default function QuizView({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [favoriteSubjects, setFavoriteSubjects] = useState([]);
  const [interests, setInterests] = useState([]);
  const [workingStyle, setWorkingStyle] = useState('');
  const [strengths, setStrengths] = useState([]);
  const [preferredDuration, setPreferredDuration] = useState('MEDIUM_TERM');
  const [budgetPreference, setBudgetPreference] = useState('PREFER_GOVT_SEATS');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const subjectOptions = [
    { id: 'Mathematics', label: 'Mathematics', desc: 'Algebra, Geometry, Numerical reasoning' },
    { id: 'Physical Science', label: 'Physical Science (Physics & Chem)', desc: 'Matter, forces, circuits, equations' },
    { id: 'Biological Science', label: 'Biological Science (Botany & Zoology)', desc: 'Human body, botany, physiology' },
    { id: 'Social Studies', label: 'Social Studies & Civics', desc: 'History, geography, politics, economy' },
    { id: 'Computers/IT', label: 'Computers & Technology', desc: 'Coding, algorithms, internet systems' },
    { id: 'Commerce/Economics', label: 'Commerce & Economics', desc: 'Money, trade, markets, banking' },
    { id: 'English/Languages', label: 'Languages & Literature', desc: 'Writing, communication, reading' },
  ];

  const interestOptions = [
    { id: 'Technology & Coding', label: 'Technology & Software', desc: 'Building apps, coding, computers' },
    { id: 'Healthcare & Medicine', label: 'Healthcare & Medical', desc: 'Treating patients, medicines, nursing' },
    { id: 'Machines & Robotics', label: 'Machines & Hardware', desc: 'Automobiles, electronics, robotics' },
    { id: 'Business & Finance', label: 'Business & Accounting', desc: 'Stock market, CA, corporate trade' },
    { id: 'Law & Civil Services', label: 'Law, Justice & Civil Services', desc: 'Constitutional law, IAS/IPS, policy' },
    { id: 'Creative Design & Arts', label: 'Design & Visual Arts', desc: 'UI/UX, drawing, architecture, media' },
    { id: 'Agriculture & Nature', label: 'Agriculture & Environment', desc: 'Farming tech, crop genetics, forestry' },
    { id: 'Defence & Aviation', label: 'Armed Forces & Aviation', desc: 'Army, Air Force, Navy, pilot careers' },
  ];

  const workingStyles = [
    { id: 'practical', label: '🛠️ Practical & Hands-on', desc: 'You prefer workshop tools, labs, machines, and physical making over pure textbook theory.' },
    { id: 'analytical', label: '🧠 Analytical & Logical', desc: 'You enjoy solving puzzles, mathematical logic, statistics, and structured reasoning.' },
    { id: 'creative', label: '🎨 Creative & Expressive', desc: 'You like visual aesthetics, sketching, storytelling, and novel out-of-the-box ideas.' },
    { id: 'theoretical', label: '📚 Theoretical & In-depth', desc: 'You have high patience for deep academic reading, research, concepts, and writing.' },
    { id: 'people_oriented', label: '🤝 People-Oriented & Empathetic', desc: 'You thrive when helping people directly, counseling, teaching, or healthcare.' },
  ];

  const strengthOptions = [
    { id: 'Problem Solving', label: 'Logical Problem Solving' },
    { id: 'Hands-on Technical', label: 'Hands-on Equipment / Assembly' },
    { id: 'Memorization & Biology', label: 'Memory & Diagram Comprehension' },
    { id: 'Communication & Debate', label: 'Communication, Debate & Persuasion' },
    { id: 'Visual Imagination', label: 'Spatial Visualization & Design' },
    { id: 'Patience & Endurance', label: 'Study Stamina & Discipline' },
  ];

  const toggleSelection = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && favoriteSubjects.length === 0) {
      alert('Please select at least one favourite subject.');
      return;
    }
    if (currentStep === 2 && interests.length === 0) {
      alert('Please select at least one field of interest.');
      return;
    }
    if (currentStep === 3 && !workingStyle) {
      alert('Please choose your preferred working style.');
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        favoriteSubjects,
        interests,
        workingStyle,
        strengths,
        preferredDuration,
        budgetPreference,
      };

      const data = await api.getRecommendations(payload);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to submit quiz to backend.');
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setResult(null);
    setCurrentStep(1);
    setFavoriteSubjects([]);
    setInterests([]);
    setWorkingStyle('');
    setStrengths([]);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Career Recommendation Engine</span>
        <h1 className="section-title">Class 10 Career Recommendation Quiz</h1>
        <p className="section-subtitle">
          Transparent, rule-based matching based on your subjects, natural thinking style, and interests. Powered by real backend scoring.
        </p>
      </div>

      {!result && (
        <div className="quiz-container">
          {/* Progress Bar */}
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
          </div>

          {/* Step 1 */}
          {currentStep === 1 && (
            <div>
              <div className="quiz-step-header">
                <div className="quiz-step-indicator">Step 1 of 5</div>
                <h2 className="quiz-step-question">Which subjects did you enjoy most in Class 10?</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  Select all subjects that you genuinely feel comfortable with or curious about.
                </p>
              </div>

              <div className="options-grid">
                {subjectOptions.map((subj) => (
                  <button
                    key={subj.id}
                    type="button"
                    className={`option-card ${favoriteSubjects.includes(subj.id) ? 'selected' : ''}`}
                    onClick={() => toggleSelection(favoriteSubjects, setFavoriteSubjects, subj.id)}
                  >
                    <div className="option-title">
                      {favoriteSubjects.includes(subj.id) ? '✓ ' : '+ '}
                      {subj.label}
                    </div>
                    <div className="option-desc">{subj.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div>
              <div className="quiz-step-header">
                <div className="quiz-step-indicator">Step 2 of 5</div>
                <h2 className="quiz-step-question">What real-world fields or activities fascinate you?</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  Select your top interests outside the classroom.
                </p>
              </div>

              <div className="options-grid">
                {interestOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`option-card ${interests.includes(item.id) ? 'selected' : ''}`}
                    onClick={() => toggleSelection(interests, setInterests, item.id)}
                  >
                    <div className="option-title">
                      {interests.includes(item.id) ? '✓ ' : '+ '}
                      {item.label}
                    </div>
                    <div className="option-desc">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div>
              <div className="quiz-step-header">
                <div className="quiz-step-indicator">Step 3 of 5</div>
                <h2 className="quiz-step-question">What is your preferred daily learning & working style?</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  This helps distinguish between practical technical routes (Polytechnic/ITI) and academic routes (Intermediate).
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {workingStyles.map((ws) => (
                  <button
                    key={ws.id}
                    type="button"
                    className={`option-card ${workingStyle === ws.id ? 'selected' : ''}`}
                    onClick={() => setWorkingStyle(ws.id)}
                  >
                    <div className="option-title">{ws.label}</div>
                    <div className="option-desc" style={{ fontSize: '0.85rem' }}>{ws.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div>
              <div className="quiz-step-header">
                <div className="quiz-step-indicator">Step 4 of 5</div>
                <h2 className="quiz-step-question">What are your personal natural strengths?</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  Pick your strongest abilities.
                </p>
              </div>

              <div className="options-grid">
                {strengthOptions.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    className={`option-card ${strengths.includes(st.id) ? 'selected' : ''}`}
                    onClick={() => toggleSelection(strengths, setStrengths, st.id)}
                  >
                    <div className="option-title">
                      {strengths.includes(st.id) ? '✓ ' : '+ '}
                      {st.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div>
              <div className="quiz-step-header">
                <div className="quiz-step-indicator">Step 5 of 5</div>
                <h2 className="quiz-step-question">Duration & Fee Preferences</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  Optional preferences to calibrate your pathway suggestions.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  Preferred Study Duration Before Employment:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className={`option-card ${preferredDuration === 'SHORT_TERM' ? 'selected' : ''}`}
                    onClick={() => setPreferredDuration('SHORT_TERM')}
                  >
                    <div className="option-title">⚡ Fast Track (1-3 Years)</div>
                    <div className="option-desc">ITI trades or Polytechnic diploma with direct technical entry</div>
                  </button>
                  <button
                    type="button"
                    className={`option-card ${preferredDuration === 'MEDIUM_TERM' ? 'selected' : ''}`}
                    onClick={() => setPreferredDuration('MEDIUM_TERM')}
                  >
                    <div className="option-title">🎓 Standard (3-5 Years)</div>
                    <div className="option-desc">Intermediate + Degree (B.Tech, B.Com, B.Sc)</div>
                  </button>
                  <button
                    type="button"
                    className={`option-card ${preferredDuration === 'LONG_TERM' ? 'selected' : ''}`}
                    onClick={() => setPreferredDuration('LONG_TERM')}
                  >
                    <div className="option-title">🩺 Long Horizon (5+ Years)</div>
                    <div className="option-desc">Medicine (MBBS), Integrated Law, Pure Research</div>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  Financial & Seat Preference:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className={`option-card ${budgetPreference === 'PREFER_GOVT_SEATS' ? 'selected' : ''}`}
                    onClick={() => setBudgetPreference('PREFER_GOVT_SEATS')}
                  >
                    <div className="option-title">🏛️ Prefer Govt Subsidized / ePASS</div>
                    <div className="option-desc">Focus heavily on Convenor Quota & fee reimbursement avenues</div>
                  </button>
                  <button
                    type="button"
                    className={`option-card ${budgetPreference === 'FLEXIBLE' ? 'selected' : ''}`}
                    onClick={() => setBudgetPreference('FLEXIBLE')}
                  >
                    <div className="option-title">⚖️ Open & Flexible</div>
                    <div className="option-desc">Consider both university and private options</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--slate-100)' }}>
            {currentStep > 1 ? (
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                ← Back
              </button>
            ) : <div></div>}

            {currentStep < 5 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next Question →
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSubmitQuiz}
              >
                {loading ? 'Evaluating Recommendations...' : '✨ Generate My Recommendations'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="error-box">
          <h3>Failed to calculate recommendations</h3>
          <p>{error}</p>
          <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }} onClick={handleSubmitQuiz}>
            Retry Submission
          </button>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="rec-result-card" style={{ borderTop: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-pathway" style={{ marginBottom: '0.5rem' }}>
                  Transparent Rule-Based Evaluation
                </span>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--slate-900)' }}>
                  Your Personalized Pathway Recommendations
                </h2>
              </div>
              <button type="button" className="btn btn-outline btn-sm" onClick={resetQuiz}>
                Retake Quiz ↻
              </button>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--slate-700)', lineHeight: '1.6', marginBottom: '2rem' }}>
              {result.profileSummary}
            </p>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--slate-900)', marginBottom: '1rem' }}>
              Top Matching Educational Pathways:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {result.topPathways.map((match, idx) => (
                <div key={match.pathwayCode} style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="match-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span className="badge badge-stream">Rank #{idx + 1}</span>
                        <h4 style={{ fontSize: '1.2rem', color: 'var(--slate-900)' }}>{match.pathwayName}</h4>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                        ⏳ Duration: <strong>{match.duration}</strong> • Focus: {match.keySubjectFocus}
                      </div>
                    </div>
                    <div className="match-pct">
                      {match.matchScorePercentage}% Match
                    </div>
                  </div>

                  <div className="match-reason-box">
                    <strong>Why this suits you:</strong> {match.matchReason}
                  </div>
                </div>
              ))}
            </div>

            {result.matchingCareers && result.matchingCareers.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--slate-900)', marginBottom: '1rem' }}>
                  Related Careers from our Catalogue:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {result.matchingCareers.map((c) => (
                    <div key={c.careerId} style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                      <span className="badge badge-admission" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                        {c.category}
                      </span>
                      <h5 style={{ fontSize: '1rem', color: 'var(--slate-900)', margin: '0.25rem 0' }}>{c.title}</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>{c.matchReason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.strategicAdvice && result.strategicAdvice.length > 0 && (
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
                  🧭 Telangana Strategic Guidance:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--slate-700)' }}>
                  {result.strategicAdvice.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onNavigate('pathways')}
              >
                Explore Full Pathways Catalogue →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
