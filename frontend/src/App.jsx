import ChatWindow from "./components/ChatWindow";
import Tabs from "./components/Tabs";
import Skills, { DomainSkills } from "./components/Skills";
import TypewriterBanner from "./components/TypewriterBanner";
import About_karper from "./components/About_karper";
import Projects from "./components/Projects";
import Forms from "./components/Forms";




function Header() {
  return (
    <header className="header">
      <div className="headerflex">
        <img
          className="avatar"
          src='https://imgur.com/0IGhiP2.jpg'
          alt="My Photo"
        />

        <div className="content">
          <h1>Karteek Varma Pericharla</h1>
          <h2>Software Developer, AI Enthusiast</h2>
          <h2>Illinois Institute of Technology || MS Artificial Intelligence</h2>
          <TypewriterBanner/>

        </div>
      </div>
    </header>
  );
}


function Aboutme() {
  return (
    <div id="about-section" className="pagewrapper">
      <div className="intro">
        <h2 style={{ fontSize: "35px" }} className="section-header" >About Me</h2>
        <p style={{ fontSize: "25px" }}className="intro-text">
            I’m Karteek Varma Pericharla, based in Chicago, Illinois. I have completed my M.S. in Computer Science (Artificial Intelligence) at Illinois Tech (May 2025) 
          after earning an MBA in AI/ML & Finance from Woxsen University and a B.Tech in Mechanical Engineering from JNTUK— a journey that’s grounded me in both 
          analytical rigor and creative problem-solving. 
          <br /><br />
          Over the past years, I’ve helped healthcare and industrial clients integrate AI— first as a Senior Technology Associate at Synechron—building full-stack and data-driven solutions that enhance efficiency 
          and drive insightsand then as an AI Services 
          Consultant at Cigniti Technologies.
          <br /><br />
          These days, I split my time between crafting RAG-powered chatbots (KarPer) with Mistral API and Chroma DB, developing reinforcement-learning trading 
          agents, and designing HMI systems for eco-friendly vehicles. My toolkit spans Python, TensorFlow, PyTorch, Scikit-learn, React, Node.js, FastAPI, Docker, 
          and cloud deployment.
          <br /><br />
          This site showcases my end-to-end projects and AI explorations—feel free to explore my code on GitHub and connect to 
          discuss AI, visualization, or new collaborations! Also try out my chatbot, KarPer, to get to know me better.
          <br /><br />
        </p>
        <Skills/>
        <DomainSkills />
        </div>

      <div className="chatbot">
         <div id="about-karper-section" className="about-karper">                   
                  <About_karper />
          </div>
      <h2 style={{ fontSize: "35px" }} id="chat-section" className="section-header2" >Hi I'am Kar_Per</h2>         
            <ChatWindow />
         
      </div>


    </div>
  );
}


export default function App() {
  return (
    <div className="App">  
        <Header/>    
        <Tabs/>
        <Aboutme/>
        <Projects/>  
        <Forms/>
    </div>
  );
}


