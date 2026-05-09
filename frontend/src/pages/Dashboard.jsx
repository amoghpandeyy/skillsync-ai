import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [task, setTask] = useState(null);
  const [improvedResponse, setImprovedResponse] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackResult, setFeedbackResult] = useState(null);
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchTask();
    }
  }, [navigate]);

  const fetchTask = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/tasks/random`);
      if (res.data) setTask(res.data);
      else setTask(null);
      setImprovedResponse('');
      setRating(5);
      setFeedbackResult(null);
    } catch (error) {
      console.error('Error fetching task', error);
    }
  };

  const submitTask = async () => {
    if (!task) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/tasks/submit`, {
        userId: user.id,
        taskId: task._id,
        improvedResponse,
        rating
      });
      user.xp = res.data.totalXp;
      user.level = res.data.newLevel;
      if (res.data.taskStats) user.taskStats = res.data.taskStats;
      if (res.data.completedTasks) user.completedTasks = res.data.completedTasks;
      localStorage.setItem('user', JSON.stringify(user));
      
      setFeedbackResult({
        xpGained: res.data.xpGained,
        totalXp: res.data.totalXp,
        newLevel: res.data.newLevel,
        aiFeedback: res.data.aiFeedback
      });
      
    } catch (error) {
      alert('Failed to submit task');
    }
  };

  return (
    <div className="dashboard-container animate-fade-in" style={{ maxWidth: '1200px', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      
      {/* Left Column: Progress & Recommendations */}
      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Progress Report */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>📊 Progress Report</h3>
          {user?.taskStats && Object.keys(user.taskStats).length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {Object.entries(user.taskStats).map(([category, count]) => (
                <li key={category} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '0.5rem' }}>
                  <span>{category}</span>
                  <span className="badge">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No tasks completed yet. Start your first mission!</p>
          )}
        </div>

        {/* Recommendations */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>💡 Recommendations</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--accent-color)', margin: '0 0 0.5rem 0' }}>Next Tasks for You</h4>
            <div style={{ background: 'rgba(128,128,128,0.1)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
              • Refine a React component<br/>
              • Debug Python data script
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--success-color)', margin: '0 0 0.5rem 0' }}>Fields to Study</h4>
            <div style={{ background: 'rgba(128,128,128,0.1)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
              • Prompt Engineering<br/>
              • React Performance
            </div>
          </div>
        </div>

      </div>

      {/* Right Column: Mission */}
      <div className="glass-panel" style={{ flex: '2 1 500px', padding: '2.5rem 3rem', position: 'relative' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Dashboard Workspace</h2>
        
        {feedbackResult ? (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h3 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Task Complete!</h3>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <p style={{ fontSize: '1.2rem', color: 'var(--success-color)', fontWeight: 'bold' }}>
              +{feedbackResult.xpGained} XP Earned!
            </p>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--accent-color)', borderRadius: '12px', padding: '1.5rem', margin: '2rem 0', textAlign: 'left' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-color)' }}>AI Mentor Feedback:</h4>
              <p style={{ margin: 0, lineHeight: '1.6' }}>"{feedbackResult.aiFeedback}"</p>
            </div>
            <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
              Next Mission
            </button>
          </div>
        ) : task ? (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="text-gradient" style={{ fontSize: '1.5rem', margin: 0 }}>Current Mission</h3>
              {task.category && <span className="badge">{task.category}</span>}
            </div>
            
            <div style={{ background: 'rgba(128,128,128,0.1)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}><strong>Prompt:</strong><br/> <span style={{ color: 'var(--text-primary)' }}>{task.prompt}</span></p>
              
              <div style={{ background: 'rgba(128,128,128,0.05)', padding: '1.5rem', borderLeft: '4px solid var(--accent-color)', borderRadius: '0 12px 12px 0' }}>
                <strong style={{ color: 'var(--text-secondary)' }}>Original Response:</strong><br/> 
                <p style={{ margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>{task.originalResponse}</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>1. Improve the Response:</label>
              <textarea 
                rows="6" 
                className="input-field"
                style={{ resize: 'vertical' }}
                value={improvedResponse}
                onChange={(e) => setImprovedResponse(e.target.value)}
                placeholder="Write a better version of the response here..."
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>2. Rate the Original Output (1-5):</label>
              <input 
                type="number" 
                min="1" max="5" 
                className="input-field"
                value={rating} 
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '120px' }}
              />
            </div>

            <button onClick={submitTask} className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
              Submit Task & Earn XP
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.2rem' }}>No tasks available right now.</p>
            <p>An admin needs to insert some into the database!</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
