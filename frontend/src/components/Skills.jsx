export default function Skills() {
return (
    <div id ='skills-section' className="skillcontainer">
        <h2 style={{ fontSize: "35px" }} className="skills-header"> <strong>💼Skills Snapshot:</strong></h2>

        <div className="allskills">

            <div
            className="skills-grid"
            style={{
                fontSize: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
            }}
            >
            <div className="skill-category">
                <h3>💻 Programming & Scripting</h3>
                <ul>
                    <li>Python</li>
                    <li>JavaScript / TypeScript</li>
                    <li>C#</li>
                    <li>SQL</li>
                    <li>React.js / Node.js</li>
                    <li>FastAPI</li>
                </ul>
            </div>

            <div className="skill-category">
                <h3>🤖 Machine Learning & AI</h3>
                <ul>
                    <li>Scikit-learn</li>
                    <li>TensorFlow</li>
                    <li>PyTorch</li>
                    <li>Transformer Models</li>
                    <li>Reinforcement Learning (DDQL)</li>
                    <li>Large Language Models</li>
                </ul>
            </div>

            <div className="skill-category">
                <h3>🧠 Deep Learning Specialties</h3>
                <ul>
                    <li><strong>NLP:</strong> GPT, Word2Vec, NLTK, TextBlob</li>
                    <li><strong>Computer Vision:</strong> Object Detection, Facial Recognition</li>
                    <li><strong>LLMs:</strong> Fine-tuning • Text Summarization • Conversational AI</li>
                </ul>
            </div>

            <div className="skill-category">
                <h3>⚙️ DevOps & Tools</h3>
                <ul>
                    <li>Git</li>
                    <li>CI/CD Pipelines</li>
                    <li>Agile Methodologies</li>
                </ul>
            </div>

            
        </div>


            <div className="skilllist2">

                <ul style={{ fontSize: "20px" }} className="skills-text1">
                <h3>🎨 Data Analysis & Visualization:</h3>
                <ul>
                    <li>Tableau</li> 
                    <li>Power BI</li>
                    <li>Matplotlib</li>                     
                    <li>Seaborn</li> 
                    <li>ggplot</li>
                </ul>
                    
                <h3>🗄️ Database & Big Data:</h3>
                <ul>
                    <li>Database Design</li>
                    <li>Query Optimization</li>
                    <li>Data Warehousing</li>
                </ul>

                <h3>🔄 Data Engineering:</h3>
                <ul>
                    <li>Data Preprocessing</li>
                    <li>Feature Engineering</li>
                    <li>AWS-based Big Data Handling</li>
                    <li>Graph-based Data Processing</li>
                    <li>Custom Pipeline Development</li>
                </ul>
                </ul>
            
            </div>

        </div>

    </div>
);
}

export function DomainSkills() {
    return (        
            <div className="skilllist3">
                <h2 style={{ fontSize: "35px" }} className="dskills-text2">
                    <strong>🏆 Application Domains:</strong>
                </h2>
                <p style={{ fontSize: "20px" }} className="dskills-text1">
                    📊 <strong>Finance</strong> – Stock Trading Algorithms, Anomaly Detection
                    <br /><br />
                    🏥 <strong>Healthcare</strong> – AI Integration in IoT Systems
                    <br /><br />
                    🌍 <strong>Environment</strong> – Flood Risk Prediction using Satellite Imagery
                    <br /><br />
                    🚗 <strong>Automotive</strong> – HMI for Eco Car Competition (EVCC)
                </p>
            </div>
    
    );
    }

