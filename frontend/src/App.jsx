import ChatWindow from "./components/ChatWindow";
import Tabs from "./components/Tabs";
import Skills, { DomainSkills } from "./components/Skills";
import TypewriterBanner from "./components/TypewriterBanner";
import Forms from "./components/Forms";




function Header() {
  return (
    <header className="header">
      <div className="headerflex">
        <img className="avatar" src="\\my-site\\frontend\\photo3.jpg" alt="Karteek Varma Pericharla" />
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
    <div className="pagewrapper">
      <div className="intro">
        <h2 style={{ fontSize: "35px" }} className="section-header" >About Me</h2>
        <p style={{ fontSize: "25px" }}className="intro-text">
          I'm a passionate software developer with a keen interest in
          <strong>Artificial Intelligence and Machine Learning</strong>.
          I adore solving problems and building innovative solutions.
          As much as it sounds simple, I can help you understand more about me in an easy way —
          you can chat with me on the other side.
        </p>
        <Skills/>
        <DomainSkills />
        </div>

      <div id="chat-section" className="chatbot">
      <h2 style={{ fontSize: "35px" }} className="section-header2" >Hi I'am Kar_Per</h2>         
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
        <Forms/>
    </div>
  );
}


