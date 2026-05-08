import React from 'react';

function StudyMaterial() {
  const materials = [
    { id: 1, title: 'Machine Learning Basics', category: 'Data Science', type: 'Course' },
    { id: 2, title: 'React Performance Optimization', category: 'Frontend', type: 'Tutorial' },
    { id: 3, title: 'Building REST APIs with Node.js', category: 'Backend', type: 'Guide' },
    { id: 4, title: 'Intro to Python for AI', category: 'AI', type: 'Course' }
  ];

  return (
    <div className="dashboard-container animate-fade-in" style={{ maxWidth: '900px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">Study Material</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enhance your skills with our curated list of resources.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {materials.map(mat => (
          <div key={mat.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>{mat.category}</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{mat.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Type: {mat.type}</p>
            <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem' }}>Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterial;
