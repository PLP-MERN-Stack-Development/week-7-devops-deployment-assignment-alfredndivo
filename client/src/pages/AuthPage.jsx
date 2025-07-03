// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const AuthPage = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');          // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  /* ---------------------------- handlers ---------------------------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data =
        mode === 'register'
          ? await authService.register(form)
          : await authService.login(form);

      if (data.token) {
        if (onAuthSuccess) onAuthSuccess(); // update parent state
        navigate('/');                      // go home
        window.location.reload();           // force fresh render
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (mode === 'register' ? 'Registration failed' : 'Invalid email or password');
      setError(msg);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setForm({ name: '', email: '', password: '' });
    setError('');
  };

  /* ----------------------------- UI ------------------------------ */
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 font-bold ${
              mode === 'register' ? 'bg-emerald-600 text-white' : 'bg-slate-100'
            }`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
          <button
            className={`flex-1 py-2 font-bold ${
              mode === 'login' ? 'bg-emerald-600 text-white' : 'bg-slate-100'
            }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 bg-red-100 px-3 py-2 rounded">{error}</p>}

          {mode === 'register' && (
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          )}

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded font-semibold"
          >
            {mode === 'register' ? 'Create Account' : 'Login'}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center mt-4">
          {mode === 'register' ? (
            <>
              Already have an account?{' '}
              <button className="text-emerald-600" onClick={toggleMode}>
                Login
              </button>
            </>
          ) : (
            <>
              Need an account?{' '}
              <button className="text-emerald-600" onClick={toggleMode}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
