import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, signup, clearError } from '../../store/authSlice';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [mode, setMode] = useState(location.pathname === '/signup' ? 'signup' : 'login');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleLogin = (credentials) => {
    dispatch(login(credentials));
  };

  const handleSignup = (userData) => {
    dispatch(signup(userData))
      .unwrap()
      .then(() => {
        setMode('login');
      })
      .catch(() => {
        // Error is already in Redux state, no additional handling needed
      });
  };
  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-600 mb-2">
            MatchMingle
          </h1>
          <p className="text-gray-600">Find your perfect connection</p>
        </div>

        {/* Card */}
        <div className="card bg-white/80 backdrop-blur-sm">
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">
                {typeof error === 'string' ? error : 'An error occurred'}
              </p>
            </div>
          )}

          {/* Forms */}
          {mode === 'login' ? (
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              onSubmit={handleSignup}
              isLoading={isLoading}
            />
          )}

          {/* Toggle button */}
          <div className="mt-6 text-center border-t pt-6">
            <p className="text-gray-600 mb-3">
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <button
              onClick={toggleMode}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              disabled={isLoading}
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}