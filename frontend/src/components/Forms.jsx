import React, { useState } from 'react';

function Forms() {
    const [inputValue, setInputValue] = useState('');
    const [emailinput, setEmail] = useState('');
    const [messageinput, setMessage] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
 
      };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }    

    return (
        <div id="forms-section" className="form-container">
            <h2 style={{ fontSize: "35px" }} className="ContactForm">Contact Me:</h2>
            <strong style={{ fontSize: "25px", paddingRight: "50px" }} className="form-name">Name:  </strong>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleChange} 
                style={{
                    width: "300px",
                    height: "80px",
                    fontSize: "18px",
                    padding: "5px",
                    paddingRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                }}
            />

            <strong style={{ fontSize: "25px", paddingLeft: "100px", paddingRight: "50px" }} className="form-name">Email:  </strong>
            <input 
                type="text" 
                value={emailinput} 
                onChange={handleEmailChange} 
                style={{
                    width: "500px",
                    height: "80px",
                    fontSize: "18px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                }}
            />
            <br /><br />
            <strong style={{ fontSize: "25px", paddingRight: "23px", }} className="form-name">Message:  </strong>
            <input 
                type="text" 
                value={messageinput} 
                onChange={handleMessageChange} 
                style={{
                    width: "1045px",
                    height: "80px",
                    fontSize: "18px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                }}
            />
            <br /><br />
            <button style={{ 
                fontSize: "30px", 
                paddingLeft: "50px", 
                paddingRight: "50px",
                paddingTop: "10px",
                paddingBottom: "10px", 
                marginLeft: "1050px",
                background: "linear-gradient(to right,rgb(236, 184, 171),rgb(241, 136, 109))",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }} onClick={() => {
                setInputValue('');
                setEmail('');
                setMessage('');
                alert("Form Submitted");
            }}>SUBMIT</button>
        </div>
    )



}

export default Forms;