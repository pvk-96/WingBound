# NexRise  
AI‑Powered Career and Skill Recommendation Platform

NexRise is an AI‑driven platform designed to help students align their learning journey with current and future job market opportunities. The application generates a personalized learning roadmap based on a student's interests, skills, academic profile and career goals. The system recommends career paths, skills to improve, step‑by‑step learning roadmap, suggested projects, courses, and internship opportunities.

---

## Features

• AI‑powered recommendation system (single API endpoint)  
• Career path recommendations suitable for the student profile  
• Skill gap identification and "skills to learn next"  
• Structured roadmap to reach the target career goal  
• Recommended projects to improve portfolio and employability  
• Suggested online courses relevant to the target career  
• Relevant internship opportunities to gain industry exposure  
• Optional: Save and retrieve user history using Firebase

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Backend | Node.js, Express |
| AI Model | Google Gemini (Google AI Studio) |
| Database (optional) | Firebase Firestore |
| Communication | REST APIs |
| Architecture | MVC + modular services |

---

## API Endpoints

### POST `/api/recommend`
Generates complete career guidance and learning roadmap using AI.

#### Request Body Example
{
"interests": "AI, coding",
"skills": "Python, C",
"branch": "CSE",
"year": "2nd year",
"goal": "Data Scientist",
"experience": "none"
}


#### Response Format
{
"success": true,
"data": {
"career_paths": [],
"skills_to_learn": [],
"roadmap": [],
"projects": [],
"resources": {
"courses": [],
"internships": []
}
}
}


---

### Optional Firebase Endpoints

#### POST `/api/user/save`
Stores generated recommendation for future access.

#### GET `/api/user/history/:id`
Fetches stored recommendations for a specific user.

---

## Project Structure

server/
├── package.json
├── .env
└── src/
├── app.js
├── server.js
├── routes/
├── controllers/
├── services/
├── config/
├── middleware/
└── utils/


---

## Environment Variables

Create a `.env` file in the backend root:

PORT=5000
GEMINI_API_KEY=your_gemini_api_key

Only required if Firebase history storage is enabled
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

---

## Running the Backend

Install dependencies:
    npm install

Start development server:
    npm run dev

Start production server:
    npm start


---

## Testing the API

Use Thunder Client or Postman.

POST:
http://localhost:5000/api/recommend

yaml
Copy code

with valid JSON body.

Expected result: structured career roadmap JSON response.

---

## Team Members and Roles

| Name | Role |
|------|------|
| Sneha K | Front End Engineer |
| Nithya Sri K | UI/UX Designer |
| Sri Charan K | AI Engineer |
| Praneeth Varma K | Backend Developer |

---

## Project Goal

NexRise helps students make informed career and learning decisions based on market‑driven recommendations rather than guesswork.  
The platform guides students from their current skill level to their desired career role through a clear and actionable AI‑generated plan.
