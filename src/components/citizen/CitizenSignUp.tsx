import { useState } from 'react';
import { User } from '../../App';
import { User as LucideUser, Mail, Lock } from 'lucide-react';

interface SignUpProps {
  onSignUp: (user: User) => void;
}

export function CitizenSignUp({ onSignUp }: SignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please complete all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    // Try backend POST /api/signup; fallback to simulated behavior if API fails
    (async () => {
      try {
        const resp = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, dob: null, phone: null, address: null, gender: null }),
        });

        if (resp.ok) {
          const data = await resp.json();
          onSignUp({
            id: String(data.user.id),
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          });
          return;
        }

        // If API returned 4xx/5xx, capture message
        const err = await resp.json().catch(() => ({}));
        setError(err.error || 'Signup failed');
      } catch (ex) {
        // Network error — fallback to local simulation
        const newUser: User = {
          id: String(Date.now()),
          name: name.trim(),
          email: email.trim(),
          role: 'citizen',
        };
        onSignUp(newUser);
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4"
      style={{
        backgroundImage: "url('/images/login-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md w-full bg-transparent">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <LucideUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-indigo-900 mb-2">Create Citizen Account</h1>
          <p className="text-gray-600">Sign up to access HealthBridge citizen services</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Jane Citizen"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Repeat password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            By creating an account you agree to the platform terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CitizenSignUp;
