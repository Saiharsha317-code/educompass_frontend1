import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function RegisterView() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Password requirement tests
  const reqLength = password.length >= 8;
  const reqNumber = /\d/.test(password);
  const reqUpper = /[A-Z]/.test(password);
  const reqSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const validateForm = () => {
    const newErrors = {};

    const cleanName = fullName.trim();
    if (!cleanName) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (cleanName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!reqLength || !reqNumber || !reqUpper || !reqSpecial) {
      newErrors.password = 'Password must satisfy all security requirements below.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'You must acknowledge the terms and educational privacy policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const user = await register({
        name: fullName.trim(),
        email: email.trim(),
        password
      });

      setStatusMessage({
        type: 'success',
        text: `Account created successfully! Welcome, ${user?.name || 'Student'}. Redirecting to your dashboard...`
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text:
          error.data?.message ||
          error.message ||
          'Registration failed. Please check the form and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleClick = () => {
    setStatusMessage({
      type: 'info',
      text:
        'Google OAuth requires a GOOGLE_CLIENT_ID configuration. To use Google Sign-In, configure GOOGLE_CLIENT_ID in backend application.properties and VITE_GOOGLE_CLIENT_ID in frontend .env. Otherwise, please register with your email and password.'
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div className="auth-header">
          <span className="section-pill">Student Portal</span>
          <h1 className="auth-title">Create Student Account</h1>
          <p className="auth-subtitle">
            Get personalized career pathway guidance, save entrance exams, and participate in EduCompass forums.
          </p>
        </div>

        {/* Integration Status Notice */}
        {statusMessage && (
          <div
            className="auth-notice-box"
            role="alert"
            style={{
              background: statusMessage.type === 'error' ? '#fef2f2' : '#eff6ff',
              borderColor: statusMessage.type === 'error' ? '#fecaca' : '#bfdbfe',
              color: statusMessage.type === 'error' ? '#991b1b' : '#1e40af'
            }}
          >
            <span>{statusMessage.type === 'error' ? '⚠️' : 'ℹ️'}</span>
            <div>{statusMessage.text}</div>
          </div>
        )}

        {/* Google Sign-in Placeholder Button */}
        <button
          type="button"
          className="google-auth-btn"
          onClick={handleGoogleClick}
          aria-label="Register with Google"
        >
          <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Sign up with Google
        </button>

        <div className="auth-divider">
          <span>or register with email</span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
              <span>Full Name</span>
              {errors.fullName && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>*</span>}
            </label>
            <div className="form-input-container">
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                placeholder="Student Name (e.g., A. Rahul Sharma)"
                className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                }}
                disabled={isSubmitting}
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby={errors.fullName ? 'reg-name-error' : undefined}
              />
            </div>
            {errors.fullName && (
              <div id="reg-name-error" className="form-error">
                <span>⚠️</span> {errors.fullName}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              <span>Email Address</span>
              {errors.email && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>*</span>}
            </label>
            <div className="form-input-container">
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="student@example.com"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
                disabled={isSubmitting}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'reg-email-error' : undefined}
              />
            </div>
            {errors.email && (
              <div id="reg-email-error" className="form-error">
                <span>⚠️</span> {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">
              <span>Password</span>
              {errors.password && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>*</span>}
            </label>
            <div className="form-input-container">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Create a strong password"
                className={`form-input ${errors.password ? 'has-error' : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                }}
                disabled={isSubmitting}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'reg-password-error' : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <div id="reg-password-error" className="form-error">
                <span>⚠️</span> {errors.password}
              </div>
            )}

            {/* Password Requirements Checklist */}
            <div className="password-requirements" aria-live="polite">
              <div className="req-title">Password Requirements:</div>
              <div className={`req-item ${reqLength ? 'met' : ''}`}>
                <span>{reqLength ? '✓' : '○'}</span> At least 8 characters
              </div>
              <div className={`req-item ${reqUpper ? 'met' : ''}`}>
                <span>{reqUpper ? '✓' : '○'}</span> At least 1 uppercase letter (A-Z)
              </div>
              <div className={`req-item ${reqNumber ? 'met' : ''}`}>
                <span>{reqNumber ? '✓' : '○'}</span> At least 1 number (0-9)
              </div>
              <div className={`req-item ${reqSpecial ? 'met' : ''}`}>
                <span>{reqSpecial ? '✓' : '○'}</span> At least 1 special character (!@#$%^&*)
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="reg-confirm-password" className="form-label">
              <span>Confirm Password</span>
              {errors.confirmPassword && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>*</span>}
            </label>
            <div className="form-input-container">
              <input
                id="reg-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className={`form-input ${errors.confirmPassword ? 'has-error' : ''}`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: null }));
                }}
                disabled={isSubmitting}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'reg-confirm-error' : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && (
              <div id="reg-confirm-error" className="form-error">
                <span>⚠️</span> {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Terms & Privacy Checkbox */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  if (errors.acceptTerms) setErrors((prev) => ({ ...prev, acceptTerms: null }));
                }}
                disabled={isSubmitting}
                aria-invalid={errors.acceptTerms ? 'true' : 'false'}
              />
              <span style={{ fontSize: '0.85rem' }}>
                I acknowledge the educational privacy terms and confirm I am a student or parent using EduCompass for career planning.
              </span>
            </label>
            {errors.acceptTerms && (
              <div className="form-error">
                <span>⚠️</span> {errors.acceptTerms}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                Validating Account...
              </>
            ) : (
              'Create Free Student Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          Already have an account?
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
