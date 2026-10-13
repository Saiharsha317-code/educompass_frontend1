

export default function PreparationView({ onNavigate }) {
  const prepTopics = [
    {
      icon: '🗣️',
      title: 'Communication & English Fluency',
      tag: 'Core Foundation',
      desc: 'Most competitive interviews, corporate workplaces, and higher education exams require clear expressive English. Read editorial articles, practice active conversation with classmates, and focus on clarity over fake accents.'
    },
    {
      icon: '💻',
      title: 'Computer & Digital Literacy',
      tag: 'Essential Skill',
      desc: 'Basic typing speed, spreadsheet skills (Excel/Sheets), file management, search heuristics, and fundamental programming concepts (Python or Web basics) are invaluable assets regardless of whether you choose Arts, Commerce, or Sciences.'
    },
    {
      icon: '🤖',
      title: 'Responsible & Ethical AI Usage',
      tag: 'Modern Future',
      desc: 'Use AI tools like ChatGPT or Gemini to clarify difficult science concepts, create practice quizzes, and explain textbook problems. Never use AI to mindlessly copy homework assignments without understanding the underlying concepts.'
    },
    {
      icon: '📖',
      title: 'Active Learning & Study Systems',
      tag: 'Academic Mastery',
      desc: 'Shift from passive rote memorization to Feynman technique (explaining concepts in simple words), active recall with flashcards, and spaced repetition. Understand the "why" and "how" behind formulas.'
    },
    {
      icon: '📁',
      title: 'Projects, Hobbies & Portfolios',
      tag: 'Proof of Work',
      desc: 'Grades open exam doors, but hands-on projects build genuine capability. Build small software programs, write blog articles, participate in science exhibitions, or design community posters to demonstrate practical skills.'
    },
    {
      icon: '💰',
      title: 'Basic Financial Literacy',
      tag: 'Life Skill',
      desc: 'Understand the value of saving, compounding interest, budgeting monthly allowances, and the difference between assets and liabilities. Avoid predatory student schemes and financial scams.'
    },
    {
      icon: '⏱️',
      title: 'Time Management & Focus Blocks',
      tag: 'Productivity',
      desc: 'Implement the Pomodoro technique (25 min intense study + 5 min break). Protect deep work time from continuous social media notifications, short-form reels, and digital distraction.'
    },
    {
      icon: '🏃',
      title: 'Physical Health, Exercise & Sleep',
      tag: 'Brain Health',
      desc: 'Memory consolidation and problem-solving sharpness happen during deep REM sleep (7-8 hours). Daily 30-minute physical movement or outdoor sports drastically cuts exam anxiety and improves memory retention.'
    },
    {
      icon: '🔍',
      title: 'Career Exploration Before Committing',
      tag: 'Critical Strategy',
      desc: 'Before locking yourself into 2 years of intense coaching or private college fees, talk to working professionals, polytechnic graduates, and senior university students. Do not choose a stream purely because friends or neighbors chose it.'
    }
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div className="section-header">
        <span className="section-pill">Foundational Skills</span>
        <h1 className="section-title">Career Preparation & Life Readiness</h1>
        <p className="section-subtitle">
          Long-term career success is built on foundational habits developed during Class 10 and Intermediate years. Here are 9 key skills beyond textbook marks.
        </p>
      </div>

      <div className="cards-grid">
        {prepTopics.map((topic, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{topic.icon}</span>
                <div>
                  <span className="badge badge-pathway" style={{ fontSize: '0.7rem', marginBottom: '0.2rem' }}>
                    {topic.tag}
                  </span>
                  <h3 className="card-title" style={{ fontSize: '1.15rem' }}>{topic.title}</h3>
                </div>
              </div>
            </div>
            <p className="card-desc" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              {topic.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Practical Action Box */}
      <div style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '2rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
          Ready to Assess Your Interests & Natural Strengths?
        </h3>
        <p style={{ color: 'var(--slate-600)', maxWidth: '600px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
          Take the EduCompass Career Recommendation Quiz to see how your preferred subjects and working habits map to post-Class 10 pathways in Telangana.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onNavigate('quiz')}
        >
          ✨ Take the 5-Minute Career Quiz →
        </button>
      </div>
    </div>
  );
}
