export default function Tabs() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="tabcontainer">
      <div className="tabs">
        <button className="tab-button" onClick={() => scrollToSection("about-section")}>
          About Me
        </button>
        <button className="tab-button" onClick={() => scrollToSection("chat-section")}>
          Talk To The Bot Kar_Per
        </button>
        <button className="tab-button" onClick={() => scrollToSection("projects-section")}>
          View Projects
        </button>
        <button className="tab-button" onClick={() => scrollToSection("skills-section")}>
          Check Skills
        </button>
        <button className="tab-button" onClick={() => scrollToSection("forms-section")}>
          Leave a Message
        </button>
      </div>
    </div>
  );
}
