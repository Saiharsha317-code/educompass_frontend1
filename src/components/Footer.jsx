
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">EduCompass Telangana</div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              An empowering, transparent career guidance platform helping Class 10 students, parents, and teachers navigate post-SSC educational pathways, government seats, scholarships, and competitive examinations across Telangana.
            </p>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Designed for Telangana State Secondary School Certificate (SSC) students.
            </div>
          </div>

          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
              <li><Link to="/pathways" onClick={scrollToTop}>Educational Pathways</Link></li>
              <li><Link to="/careers" onClick={scrollToTop}>Career Catalogue</Link></li>
              <li><Link to="/quiz" onClick={scrollToTop}>Recommendation Quiz</Link></li>
              <li><Link to="/exams" onClick={scrollToTop}>Entrance Examinations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Guidance</h4>
            <ul className="footer-links">
              <li><Link to="/scholarships" onClick={scrollToTop}>Govt Seats & Scholarships</Link></li>
              <li><Link to="/preparation" onClick={scrollToTop}>Career Preparation</Link></li>
              <li><Link to="/forum" onClick={scrollToTop}>Community Q&A Forum</Link></li>
              <li><Link to="/login" onClick={scrollToTop}>Student Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Official Portals</h4>
            <ul className="footer-links">
              <li><a href="https://tsche.ac.in" target="_blank" rel="noopener noreferrer">TSCHE (Higher Education Council) ↗</a></li>
              <li><a href="https://polycet.sbtet.telangana.gov.in" target="_blank" rel="noopener noreferrer">SBTET (Polytechnic Board) ↗</a></li>
              <li><a href="https://tsbie.cgg.gov.in" target="_blank" rel="noopener noreferrer">TSBIE (Intermediate Board) ↗</a></li>
              <li><a href="https://telanganaepass.cgg.gov.in" target="_blank" rel="noopener noreferrer">TS ePASS (Scholarship Portal) ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EduCompass Telangana. Created for educational awareness. Always consult official gazettes and board notifications for active admission deadlines, cutoffs, and seat rules.</p>
        </div>
      </div>
    </footer>
  );
}

