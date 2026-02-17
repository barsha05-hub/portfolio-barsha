# Cinematic 3D Portfolio

A high-performance, single-page portfolio website featuring a "Cinematic Dark Luxury" aesthetic, immersive scroll animations, and an integrated AI Chatbot.

![Portfolio Screenshot](./public/photo.jpg) 
*(Note: Replace with a screenshot of your actual site)*

## 🌟 Features

- **Cinematic Visuals**: Deep matte black background, electric blue accents, and floating 3D stickers.
- **Scroll-Linked Animations**: Smooth section reveals and a glassmorphism navigation dock.
- **AI Chatbot**: A smart assistant powered by **Groq (Llama 3)**, trained on my resume data.
- **Interactive Projects**: 3D tilt cards and full-screen details modal.
- **Performance**: Built with Vite + React for lightning-fast loading.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS v4, Framer Motion
- **Backend**: Node.js, Express
- **AI**: Groq SDK (Llama 3.3)
- **Icons**: Lucide React

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory and add your Groq API key:
    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```

4.  **Run Locally**:
    ```bash
    # Run in development mode (Client + Server)
    npm run dev
    # OR build and run the production server
    npm run build
    node server.js
    ```

## 📦 Deployment

This project is ready for **Render**, **Vercel**, or **Netlify**.

### Deploying to Render (Recommended for Chatbot Support)
1.  Connect your GitHub repo to Render.
2.  Select **Web Service**.
3.  Set Build Command: `npm install && npm run build`
4.  Set Start Command: `node server.js`
5.  Add your `GROQ_API_KEY` in the Environment Variables settings.

---

Crafted with ❤️ by Barsha Pradhan
