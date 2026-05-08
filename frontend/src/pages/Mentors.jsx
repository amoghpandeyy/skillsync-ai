import React from 'react';

function Mentors() {
  const mentors = [
    { id: 1, name: 'Dr. Alan Turing', expertise: 'Artificial Intelligence', available: true },
    { id: 2, name: 'Grace Hopper', expertise: 'Systems Programming', available: true },
    { id: 3, name: 'Ada Lovelace', expertise: 'Algorithms', available: false },
    { id: 4, name: 'Tim Berners-Lee', expertise: 'Web Technologies', available: true }
  ];

  return (
    <div className="dashboard-container animate-fade-in" style={{ maxWidth: '900px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">Mentors</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Connect with industry experts to accelerate your growth.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {mentors.map(mentor => (
          <div key={mentor.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', fontWeight: 'bold' }}>
              {mentor.name.charAt(0)}
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0' }}>{mentor.name}</h3>
            <p style={{ color: 'var(--accent-color)', fontWeight: '600', margin: '0 0 1rem 0' }}>{mentor.expertise}</p>
            <p style={{ fontSize: '0.9rem', color: mentor.available ? 'var(--success-color)' : 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {mentor.available ? '● Available for 1:1' : '○ Currently unavailable'}
            </p>
            <button className="btn btn-outline" disabled={!mentor.available} style={{ width: '100%', opacity: mentor.available ? 1 : 0.5 }}>
              {mentor.available ? 'Connect' : 'Waitlist'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mentors;
