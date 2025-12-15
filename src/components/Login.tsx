import { useState } from 'react';
import { User, UserRole } from '../App';
import { Shield, Heart, AlertCircle, Eye, EyeOff } from 'lucide-react';
import CitizenSignUp from './citizen/CitizenSignUp';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Mock user database
const MOCK_USERS = [
  { id: '1', email: 'admin@healthbridge.gov', password: 'admin123', name: 'Admin User', role: 'administrator' as UserRole },
  { id: '2', email: 'kaelmiranda@example.com', password: 'kael123', name: 'Kael Miranda', role: 'citizen' as UserRole },
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Try backend login first
    (async () => {
      try {
        const resp = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (resp.ok) {
          const data = await resp.json();
          onLogin({ id: String(data.user.id), name: data.user.name, email: data.user.email, role: data.user.role });
          return;
        }

        // fallback to mock users if backend returns 4xx
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (user) {
          onLogin({ id: user.id, name: user.name, email: user.email, role: user.role });
          return;
        }

        setError('Invalid email or password');
      } catch (ex) {
        // network error, fallback to mock users
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (user) {
          onLogin({ id: user.id, name: user.name, email: user.email, role: user.role });
        } else {
          setError('Invalid email or password');
        }
      }
    })();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password reset link sent to: ' + email);
    setShowForgotPassword(false);
  };

  return (
    <>
      {showSignUp ? (
        <CitizenSignUp onSignUp={(user) => onLogin(user)} />
      ) : (
        <div
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4"
          style={{
            backgroundImage: "url('/images/login-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-md w-full bg-transparent">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-indigo-900 mb-2">HealthBridge Initiative</h1>
          <p className="text-gray-600">Connecting citizens with substance abuse resources and community health support</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {!showForgotPassword ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-indigo-600" />
                <h2 className="text-gray-900">Sign In</h2>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Forgot Password?
                </button>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 mb-2">Demo Credentials:</p>
                <div className="space-y-1">
                  <p className="text-gray-600"><strong>Admin:</strong> admin@healthbridge.gov / admin123</p>
                  <p className="text-gray-600"><strong>Citizen:</strong> citizen@example.com / citizen123</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-gray-900 mb-6">Reset Password</h2>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-gray-600 hover:text-gray-700"
                >
                  Back to Sign In
                </button>
              </form>
            </>
          )}
        </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowSignUp(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mb-4"
              >
                Create a citizen account
              </button>
            </div>

            <p className="text-center text-gray-600">
              A secure government platform for community health and wellness <br/>© 2025 HealthBridge Initiative
            </p>
          </div>
        </div>
      )}
    </>
  );
}
