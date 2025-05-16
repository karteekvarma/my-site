import React from 'react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Personal Web Portfolio',
    image: 'https://imgur.com/yQShYMH.png',
    description: [
      'Developed a personal portfolio website using React and CSS',
      'Integrated Typewriter effect for dynamic text display',
      'Implemented a chatbot using OpenAI API for user interaction',
      'Deployed on render.com with a custom domain',
      'Utilized GitHub Actions for CI/CD',
    ],

    tech: ['Python', 'Docker', 'CSS', 'React'],
    github: 'https://github.com/karteekvarma/my-site/tree/main/frontend',
  },
  {
    title: 'Virtual Assistant Chatbot',
    image: 'https://imgur.com/Gnnlj1w.png',
    description: [
      'Created a virtual assistant chatbot using OpenAI API and ChromaDB',
      'Implemented RAG (Retrieval-Augmented Generation) for enhanced responses',
      'Integrated and hosted it with a personal web portfolio',
      'Utilized FastAPI for backend and Uvicorn for ASGI server',

    ],
    tech: ['Hugging Face Transformers', 'LangChain', 'SHAP', 'FastAPI', 'Uvicorn', 'Pydantic'],
    github: 'https://github.com/karteekvarma/my-site/tree/main/backend/rag_bot',
  },
  {
    title: 'Reinceforcement Learning Trading Agent',
    image: 'https://imgur.com/7nKwxww.png',
    description: [
      'Developed a reinforcement learning trading agent using TensorFlow and Keras',
      'Implemented DQN (Deep Q-Network) for stock trading strategy',
      'Trained on historical stock data with custom reward functions',
      'Visualized performance metrics using Matplotlib and Seaborn',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/karteekvarma/DDQL-ReinforcementLearningAgent',
  },
];

export default function Projects() {
  return (
    <section id="project-section" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((proj) => (
            <div key={proj.title} className="project-card">
              <img src={proj.image} alt={proj.title} className="project-image" />
              <div className="project-content">
                <h3 className="project-name">{proj.title}</h3>
                <ul className="project-list">
                  {proj.description.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                <p className="project-tech">
                  <strong>Tech Stack:</strong> {proj.tech.join(', ')}
                </p>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <FaGithub className="project-icon" /> GitHub Link
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
