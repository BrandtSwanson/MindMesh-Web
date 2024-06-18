import React, { useEffect, useState } from "react";
import "../../styles/assistant/Assistant.css";
import "../../styles/global/App.css";
import TitleBar from "../../components/TitleBar";

import Markdown from 'react-markdown'


function Assistant() {
  const [queryRequest, setQueryRequest] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [error, setError] = useState("");

  // Function 
  const llamaQuery = async () => {
    const queryURL = new URL("http://localhost:5601/query?");
    queryURL.searchParams.append("text", queryRequest);
  
    const response = await fetch(queryURL, { mode: "cors" });
    if (!response.ok) {
      return { text: "Error in query", sources: [] };
    }
  
    try {
      const textResponse = await response.text();
      setQueryResponse(textResponse);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    
  };


  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      llamaQuery();
    }
  };

  return (
    <div className="app">
      <TitleBar></TitleBar>
      <div className="assistant-page">
        <h1 className="assistant-title">Assistant</h1>
        <input
          className="assistant-entry"
          type="text"
          value={queryRequest}
          onChange={(e) => setQueryRequest(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Query..."
        />
        <button onClick={llamaQuery}>Query</button>

        {/* List of notes */}
        <h1>
          <Markdown>
            {queryResponse}
          </Markdown>
        </h1>
      </div>
    </div>
  );
}

export default Assistant;
