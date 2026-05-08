const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const router = express.Router();

// Get random task
router.get('/random', async (req, res) => {
  try {
    const count = await Task.countDocuments();
    const random = Math.floor(Math.random() * count);
    const task = await Task.findOne().skip(random);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit task
router.post('/submit', async (req, res) => {
  try {
    const { userId, taskId, improvedResponse, rating } = req.body;
    
    const user = await User.findById(userId);
    const task = await Task.findById(taskId);
    if (!user || !task) return res.status(404).json({ message: 'User or Task not found' });

    let xpGained = 50;
    let aiFeedback = "Good job! Keep it up.";

    try {
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an AI programming mentor. 
        A user has been tasked with improving an original AI response.
        
        Original Task Prompt: "${task.prompt}"
        Original Flawed Response: "${task.originalResponse}"
        User's Improved Response: "${improvedResponse}"
        User's Rating of Original: ${rating}/5
        
        Evaluate the User's Improved Response. 
        Provide exactly a JSON response with two fields:
        "score": a number from 10 to 100 representing how good their improvement is (100 being perfect).
        "feedback": a 1-2 sentence encouraging feedback message.
        Only output the JSON object without markdown formatting.`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            xpGained = parsed.score || 50;
            aiFeedback = parsed.feedback || aiFeedback;
        }
      } else {
        aiFeedback = "API Key not configured. Using fallback offline evaluation. Good job!";
      }
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);
    }

    user.xp += xpGained;

    // Calculate level (every 100 XP = 1 level upgrade, base 1)
    user.level = Math.floor(user.xp / 100) + 1;

    // Update progress tracking
    if (!user.completedTasks.includes(taskId)) {
      user.completedTasks.push(taskId);
      const category = task.category || 'General';
      if (!user.taskStats) user.taskStats = new Map();
      const currentCount = user.taskStats.get(category) || 0;
      user.taskStats.set(category, currentCount + 1);
    }

    await user.save();
    
    res.json({ 
      message: 'Task submitted', 
      xpGained, 
      totalXp: user.xp, 
      newLevel: user.level,
      taskStats: user.taskStats,
      completedTasks: user.completedTasks,
      aiFeedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
