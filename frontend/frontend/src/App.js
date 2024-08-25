import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            console.log("Submitting data:", parsedData);

            const result = await axios.post('https://bajaj-scoi.onrender.com/bfhl', parsedData);
            console.log("Received response:", result.data);
            setResponse(result.data);
        } catch (error) {
            console.error("Error submitting data", error);

            if (error instanceof SyntaxError) {
                alert("Invalid JSON format. Please check your input and try again.");
            }
        }
    };

    const renderResponseItems = (label, items) => (
        <div className="response-item">
            <h4>{label}:</h4>
            <p>{items.join(', ')}</p>
        </div>
    );

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div className="response-container">
                {selectedOptions.includes('Numbers') && renderResponseItems('Numbers', response.numbers)}
                {selectedOptions.includes('Alphabets') && renderResponseItems('Alphabets', response.alphabets)}
                {selectedOptions.includes('Highest lowercase alphabet') && renderResponseItems('Highest Lowercase Alphabet', response.highest_lowercase_alphabet)}
            </div>
        );
    };

    return (
        <div className="app-container">
            <h1 className="title">Bajaj Finserv Health Challenge</h1>
            <div className="form-container">
                <textarea
                    className="json-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Enter JSON data"
                    rows={6}
                />
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="dropdown-container">
                <label className="dropdown-label">Select Data to Display:</label>
                <select
                    className="dropdown"
                    multiple
                    onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
                >
                    <option value="Numbers">Numbers</option>
                    <option value="Alphabets">Alphabets</option>
                    <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                </select>
            </div>
            {renderResponse()}
        </div>
    );
}

export default App;
