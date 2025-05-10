export default function Skills() {
return (
    <div className="skillcontainer">
        <h2 style={{ fontSize: "35px" }} className="skills-header"> <strong>💼Skills Snapshot:</strong></h2>

        <div className="allskills">

            <div className="skilllist">
                <p style={{ fontSize: "20px" }} className="skills-text1">
                🔹<strong>Programming & Scripting:</strong><br />
                    Python, JavaScript, TypeScript, C#, SQL
                    <br /><br />
                    🔹 <strong>Machine Learning & AI:</strong><br />
                    Scikit-learn, TensorFlow, PyTorch, Transformer Models, Reinforcement Learning (DDQL), Large Language Models
                    <br /><br />
                    🔹 <strong>Deep Learning Specializations:</strong><br />
                    NLP: GPT, Word2Vec, NLTK, TextBlob
                    <br /><br />
                    Computer Vision: Object Detection, Facial Recognition
                    <br /><br />
                    LLMs: Fine-tuning | Text Summarization | Conversational AI
                    <br /><br />
                    🔹 <strong>DevOps & Tools:</strong><br />
                    Git, CI/CD Pipelines, Agile Methodologies
                    <br /><br />
                    
                </p>
            </div>

            <div className="skilllist2">

                <p style={{ fontSize: "20px" }} className="skills-text1">
                    🔹 <strong>Data Analysis & Visualization:</strong><br />
                    Tableau, Power BI, Matplotlib, Seaborn, ggplot
                    <br /><br />
                    🔹 <strong>Database & Big Data:</strong><br />
                    MS SQL, Database Design, Query Optimization, Data Warehousing
                    <br /><br />
                    🔹 <strong>Data Engineering:</strong><br />
                    Data Preprocessing | Feature Engineering | AWS-based Big Data Handling
                    <br /><br />
                    Graph-based Data Processing | Custom Pipeline Development
                    <br /><br />
                    
                    🔹 <strong>HMI & Embedded Systems:</strong><br />
                    PowerVision by Enovation Controls
                    <br /><br />
                    CAN Bus Communication, DBC File Creation, Automotive HMI Logic Design
                </p>
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

