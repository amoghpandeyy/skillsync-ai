import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Error'));
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="animate-fade-in" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1200px', width: '100%', gap: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Left Side: Hero & Features */}
        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Level Up Your Skills with <span className="text-gradient">SkillSync AI</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Our platform provides personalized AI-driven tasks, smart recommendations, and an immersive progression system to help you master new technologies.
          </p>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-color)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>🚀 Complete Tasks & Earn XP</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Gain experience points by completing real-world AI generated coding and conceptual challenges.</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success-color)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>📚 Smart Recommendations</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Get tailored study materials and task suggestions based on your interests and past progress.</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning-color)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>🤝 Connect with Mentors</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Stuck on a concept? Reach out to industry experts for 1-on-1 guidance and feedback.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div style={{ flex: '1 1 400px', maxWidth: '480px' }}>
          <div className="glass-panel" style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Welcome Back</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="input-field"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="input-field"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}>
                Login to Workspace
              </button>
            </form>
            <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
              Don't have an account? <a href="/register" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Register here</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
