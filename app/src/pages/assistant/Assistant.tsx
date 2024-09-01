import React, { useEffect, useState } from "react";
import "../../styles/assistant/Assistant.css";
import "../../styles/global/App.css";
import TitleBar from "../../components/TitleBar";
import { createNote } from "../../api/api";
import Markdown from 'react-markdown'

type Props = {
}

const Assistant = ({}: Props) => {
  const [queryRequest, setQueryRequest] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [error, setError] = useState("");
  const [showLoad, setShowLoad] = useState(false);
  const [loadNum, setLoadNum] = useState(1);

  const getRandomNumber = () => Math.floor(Math.random() * 5) + 1;
  // Function to query
  const llamaQuery = async () => {
    setLoadNum(getRandomNumber);
    setQueryResponse("");
    setShowLoad(true);
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

  // Function to add a new note
  const addNote = () => {
    if (queryRequest.trim() !== "" && queryResponse.trim() !== "") {
      // Create a new note object with a unique ID
      const newNote = {
        id: Date.now(),
        title: queryRequest,
        content: queryResponse,
        // Add more properties as needed (e.g., createdAt, updatedAt)
      };

      createNote(JSON.stringify(newNote))
        .then((response) => {
          console.log("Note added.");
        })
        .catch((error) => console.error("Error creating note:", error));
    }
  };

  return (
    <div className="app">
      <TitleBar text="assistant"></TitleBar>
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
        <button onClick={addNote}>Add to notes</button>
        {showLoad && queryResponse == "" && (
        <img
        src={require('../../images/' + loadNum + '.webp')}
        style={{ width: 100, height: 100 }}
      />
        )}
        {/* Displaying query response using Markdown */}
        <div className="query-response">
          <Markdown>{queryResponse}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
