import 'dotenv/config'; // Start dotenv immediately

import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize Groq
// Note: In production, NEVER hardcode keys. We use process.env.GROQ_API_KEY.
// The key should be in a .env file locally, and in Render environment variables.
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Resume Context
const RESUME_CONTEXT = `
You are an AI assistant for Barsha Pradhan's portfolio website. 
Your goal is to answer questions about Barsha's professional background, skills, and projects based strictly on the content below.
Keep answers concise, professional, and friendly.

name: Barsha Pradhan
role: Computer Science Undergraduate (Data Science Specialization)
location: Berhampur, Odisha
email: barsha20pradhan10@gmail.com
phone: 9777272639

EXPERIENCE:
- Student Trainee at Central Tool Room & Training Centre (CTTC) (July 2025): 
  - Completed technical training focused on programming and software development concepts.
  - Participated in hands-on coding sessions to strengthen analytical skills.

EDUCATION:
- B.Tech in Computer Science Engineering (Data Science) at National Institute of Science and Technology (Aug 2024 – Oct 2025).

SKILLS:
- Languages: C / C++ (85%), Python (90%)
- Tech: Data Structures (80%), React / Frontend (75%), Networking (70%), Git / GitHub (85%)
- Tools: MySQL, VS Code, Linux, Windows, Office Suite

CERTIFICATIONS:
- Python Course (CTTC)
- Python Workshop (AI Academia)
- Python 101 (IBM)
- C Essentials 1 (Cisco)
- Cybersecurity Analyst (Tata)

PROJECTS:
1. E-Commerce Dashboard (Web Application): A comprehensive analytics dashboard for online retailers featuring real-time data visualization.
2. Fintech Mobile App (UI/UX Design): User-centered design for a modern banking application focusing on accessibility and security.
3. AI Image Generator (Machine Learning): Interface design for a generative AI tool allowing users to create custom artwork.

BIO:
Quick learner with strong analytical skills and a proven ability to adapt in fast-paced environments. Motivated Computer Science undergraduate specializing in Data Science. Bridges the gap between complex backend logic and immersive, cinematic frontend experiences.
`;

// Chat Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: RESUME_CONTEXT
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 1024,
        });

        const response = completion.choices[0]?.message?.content || "I couldn't generate a response.";
        res.json({ reply: response });

    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'Failed to fetch response' });
    }
});

// Fallback for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
