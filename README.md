# SkillSync AI

SkillSync AI is a full-stack interactive web platform where users can earn XP and level up by completing AI-related tasks. The platform features a dynamic frontend built with React (Vite) and a backend powered by Node.js, Express, and MongoDB.

## Features

- **Dynamic Landing Page**: A comprehensive and attractive entry point with a Light/Dark theme toggle.
- **Task Tracking & XP System**: Users complete AI-related tasks to earn XP and level up, gamifying the learning experience.
- **Progress Reporting & Recommendations**: A backend-driven engine tracks task completion by category to provide personalized user feedback.
- **Study Materials & Mentors**: Dedicated sections to help users grow their AI skills.

## Technologies Used

### Frontend
- React
- Vite
- Context API (for theme/state management)
- TailwindCSS (if configured) / Vanilla CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amoghpandeyy/skillsync-ai.git
   cd skillsync-ai
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your MongoDB connection string and other environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   Open a new terminal window/tab.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173` (or the port Vite provides).

## Contributing
Feel free to open issues or submit pull requests for any improvements or bug fixes.

## License
MIT
