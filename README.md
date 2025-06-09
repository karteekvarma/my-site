This repository showcases a full-stack AI-powered portfolio site. The project includes an interactive chatbot (Kar_Per) built with FastAPI and Mistral API and a React-based frontend portfolio. 

**It is divided into**:

my-site/
│
├── frontend/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── ChatWindow.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── ChatInput.jsx
│   │   ├── About_karper.jsx
│   │   ├── Forms.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Tabs.jsx
│   │   ├── TypewriterBanner.jsx
│   ├── index.css
│   ├── App.css
│   └── Router.jsx
│
├── backend/
│   ├── main.py
│   ├── ragbot.py
│   ├── rag-bot-key.env
│   ├── requirements.txt
│   └── build_vectorbase_chromastore.ipynb

**Section 1 - Frontend (React)**
  The frontend handles all UI/UX and interactive components of the website.
  
  **Key Files:**
    **App.jsx:** Root component that integrates the header, tabs, sections like About, Skills, Projects, and the chatbot.
    
   ** main.jsx:** Entry point for rendering the React app to the DOM using ReactDOM.createRoot.
    
    **Router.jsx:** Handles client-side routing for navigation between different sections.
    
    **App.css & index.css:** Global and scoped styles for layout, responsiveness, chat window styling, buttons, etc.
    
    **TypewriterBanner.jsx:** Shows dynamic rotating text below the profile name.
    
    **Tabs.jsx:** Navigation tab that scrolls to various page sections smoothly.
    
   ** ChatWindow.jsx / ChatInput.jsx / MessageBubble.jsx:** Components for the chatbot UI.
    
    **Projects.jsx:** Renders personal and academic projects with GitHub links.
    
    **Skills.jsx:** Displays both technical and domain-specific skills.
    
    **About_karper.jsx:** Describes the Kar_Per chatbot's personality and usage tips.
    
    **Forms.jsx:** A contact form to allow users to submit name, email, and message.

  
**Section 2 - Backend (FastAPI + LangChain)**

  The backend supports Kar_Per, a Retrieval-Augmented Generation (RAG) chatbot built using the Mistral API and ChromaDB.
  
  **Key Files:**
    **main.py:**
    
    Initializes the FastAPI app and sets up CORS.
    
    Defines a /chat endpoint that fetches relevant document chunks from ChromaDB using LangChain.
    
    Queries the Mistral API for an AI-generated response using the context.
    
    Serves static files for frontend deployment if available.
    
    **ragbot.py:**
    
    Initializes a Chroma vector store using HuggingFace sentence embeddings.
    
    Loads the Chroma directory and sets the embedding model for similarity search.
    
   ** build_vectorbase_chromastore.ipynb:**
    
    A Jupyter notebook used to create and populate the Chroma vector store with relevant document content.

**Configuration Files**
  **rag-bot-key.env:**
  
    Stores secret environment variables:
    
      MISTRAL_API_KEY: Your key for accessing Mistral API.
      
      CHROMA_DIR: Path to your local Chroma vector store.
      
      Make sure these files are excluded from public commits using .gitignore.
  
  **requirements.txt:**
  
    Lists all Python dependencies for running the backend, including:
    
      fastapi, uvicorn, requests: For serving the API.
      
      langchain, chromadb, sentence-transformers: For vector-based document retrieval.
      
      pypdf, tqdm, python-dotenv: Utility and environment management.

**Note: You may not find the configuration files in here, but are necessary for deployment**

**Deployment Notes**

  Frontend is intended to be deployed using services like GitHub Pages or Vercel.
  
  Backend can be hosted on services like Render or Hugging Face Spaces (with Docker support).
  
  CORS is configured to allow frontend access from localhost and GitHub Pages.

**Try Kar_Per**
  Chat with Kar_Per to learn more about Karteek’s background, projects, and skills.
  
  If Kar_Per is unresponsive, it may be due to Mistral API quota limits or inactive vector store.

**Security Tips**
  Always keep rag-bot-key.env out of version control.
  
  Rotate API keys periodically.
  
  Do not expose hardcoded secrets in frontend JavaScript (use environment variables on the backend only).




