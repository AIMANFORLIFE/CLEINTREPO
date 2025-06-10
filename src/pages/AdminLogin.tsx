import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import CursorTracker from '../components/CursorTracker';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center cursor-none">
      <AnimatedBackground />
      <CursorTracker />
      <div className="relative z-10 w-full max-w-md px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-white/80 hover:text-white transition-all duration-300 glass-button px-4 py-2 animate-fade-in-left"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to site
        </button>

        <div className="glass-card p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-4 animate-bounce-in">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-medium text-white mb-2 animate-fade-in-up">
              Admin Access
            </h1>
            <p className="text-white/60 text-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Authorized personnel only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 hover:border-white/30"
                placeholder="Email"
                required
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 hover:border-white/30"
                placeholder="Password"
                required
              />
            </div>

            {error && (
              <div className="glass-card bg-red-500/20 border-red-500/30 p-4 animate-bounce-in">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full glass-button-primary text-white px-8 py-4 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Signing in...' : 'Access Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;