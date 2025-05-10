import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  
  import Header from "./components/Header";
  import AboutMe from "./components/Aboutme";
  import Projects from "./components/Projects";
  import ChatWindow from "./components/ChatWindow";
  
  export default function AppRouter() {
    return (
      <Router>
        <Header /> {/* stays visible on all pages */}
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/chat" element={<ChatWindow />} />
        </Routes>
      </Router>
    );
  }
  