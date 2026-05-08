import { Link, useNavigate } from 'react-router-dom';

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  // Simple check for user data
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="glass-nav" style={{ padding: '1.2rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '0.5px' }}>SkillSync AI</h2>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/study-material" style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Study Material</Link>
          <Link to="/mentors" style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Mentors</Link>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={toggleTheme} style={{ padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', border: 'none', fontSize: '1.2rem', background: 'transparent' }} title="Toggle Theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {user ? (
          <>
            <div className="badge">
              <span>LVL {user.level}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span>XP {user.xp}</span>
            </div>
            <button onClick={logout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
