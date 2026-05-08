const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/Task');

// Load environment variables from .env file
dotenv.config();

const sampleTasks = [
  {
    prompt: "Write a polite email refusing a job offer.",
    originalResponse: "I don't want the job. Don't contact me again. Bye."
  },
  {
    prompt: "Explain what a 'loop' is in programming.",
    originalResponse: "A loop goes around and around continuously. It stops eventually."
  },
  {
    prompt: "Write a 1-sentence summary of the movie The Matrix.",
    originalResponse: "A guy takes a pill and then realizes his whole life is actually just a huge computer game."
  },
  {
    prompt: "Translate 'Hello, how are you?' to French.",
    originalResponse: "Bonjour as tu manger ca va?"
  },
  {
    prompt: "Write a tweet announcing a new feature for a productivity app.",
    originalResponse: "Hey we have a new feature. Update the app."
  },
  {
    prompt: "Suggest 3 healthy breakfast ideas.",
    originalResponse: "Eat cereal, a banana, or maybe some bread. I think."
  },
  {
    prompt: "Write a python script that prints random numbers.",
    originalResponse: "import rand\nprint(rand.randomnum())"
  },
  {
    prompt: "Explain quantum entanglement to a 5 year old.",
    originalResponse: "It's when two small particles are linked, even far away."
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing tasks to avoid duplicates
    await Task.deleteMany();
    
    // Insert the sample tasks
    await Task.insertMany(sampleTasks);
    
    console.log('Successfully seeded database with 3 sample tasks!');
    process.exit();
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
    process.exit(1);
  });
