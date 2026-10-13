import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateForm = () => {
    const newErrors = {};
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g., student@example.com).';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const user = await login({
        email: email.trim(),
        password,
        rememberMe
      });

      setStatusMessage({
        type: 'success',
        text: `Welcome back${user?.name ? `, ${user.name}` : ''}!`
      });

      navigate(from, { replace: true });
    } catch (error) {
      let message =
        error.data?.message ||
        'Sign-in failed. Please check your credentials and try again.';

      if (error.status === 401) {
        message = 'Invalid email address or password.';
      } else if (error.status === 403) {
        message = 'Access denied. Please contact support if this continues.';
      } else if (!error.status) {
        message = 'Unable to connect to the backend server. Please verify that the API is running on port 8080.';
      }

      setStatusMessage({
        type: 'error',
        text: message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleClick = () => {
    setStatusMessage({
      type: 'info',
      text:
        'Google OAuth requires a GOOGLE_CLIENT_ID configuration. To use Google Sign-In, configure GOOGLE_CLIENT_ID in backend application.properties and VITE_GOOGLE_CLIENT_ID in frontend .env. Otherwise, please sign in with your email and password.'
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <span className="section-pill">Student Portal</span>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Sign in to access your personal post-Class 10 career plan, bookmarks, and forum discussions.
          </p>
        </div>

        {statusMessage && (
          <div
            className="auth-notice-box"
            role="alert"
            aria-live="polite"
            style={{
              background:
                statusMessage.type === 'error'
                  ? '#fef2f2'
                  : statusMessage.type === 'success'
                    ? '#f0fdf4'
                    : '#eff6ff',
              borderColor:
                statusMessage.type === 'error'
                  ? '#fecaca'
                  : statusMessage.type === 'success'
                    ? '#bbf7d0'
                    : '#bfdbfe',
              color:
                statusMessage.type === 'error'
                  ? '#991b1b'
                  : statusMessage.type === 'success'
                    ? '#166534'
                    : '#1e40af'
            }}
          >
            <span>
              {statusMessage.type === 'error'
                ? '⚠️'
                : statusMessage.type === 'success'
                  ? '✓'
                  : 'ℹ️'}
            </span>
            <div>{statusMessage.text}</div>
          </div>
        )}

        <button
          type="button"
          className="google-auth-btn"
          onClick={handleGoogleClick}
          disabled={isSubmitting}
          aria-label="Continue with Google"
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
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              <span>Email Address</span>
              {errors.email && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>*</span>}
            </label>

            <div className="form-input-container">
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="student@example.com"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (errors.email) {
                    setErrors((previous) => ({
                      ...previous,
                      email: null
                    }));
                  }
                }}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
              />
            </div>

            {errors.email && (
              <div id="login-email-error" className="form-error">
                <span>⚠️</span> {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              <span>Password</span>
              {errors.password && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>*</span>}
            </label>

            <div className="form-input-container">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`form-input ${errors.password ? 'has-error' : ''}`}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (errors.password) {
                    setErrors((previous) => ({
                      ...previous,
                      password: null
                    }));
                  }
                }}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                disabled={isSubmitting}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && (
              <div id="login-password-error" className="form-error">
                <span>⚠️</span> {errors.password}
              </div>
            )}
          </div>

          <div className="form-row-remember">
            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                disabled={isSubmitting}
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  style={{
                    display: 'inline-block',
                    animation: 'spin 1s linear infinite'
                  }}
                >
                  ⏳
                </span>
                Signing in...
              </>
            ) : (
              'Sign In to Student Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account yet?
          <Link to="/register">Create student account</Link>
        </div>
      </div>
    </div>
  );
}
