import React, { useEffect, useState } from "react";
import "../../styles/agents/AgentLibrary.css";
import "../../styles/global/App.css";
import TitleBar from "../../components/TitleBar";
import { createNote, getAllAgents } from "../../api/api";
import Markdown from 'react-markdown'
import { Link } from "react-router-dom";

type Props = {
}

export interface Agent {
  id:number;
  name:string;     // Event name or title
  description:string; // Event description
  prompt:string
  doc_limit:number; 
  distance_limit:number;
  data_sources:string[];   // List of attendee emails
}

const AgentLibrary = ({}: Props) => {
  const [queryRequest, setQueryRequest] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [showLoad, setShowLoad] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loadNum, setLoadNum] = useState(1);
  const [conversation, setConversation] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("You are an assistant designed to answer questions based on both specific context provided and general knowledge. When responding to a question, if the question pertains to the provided context, begin your response with \"Given what you have told me,\" and use the context information to formulate your answer, ensuring it is directly relevant to the provided details. If the context does not cover the question, answer the question using your general knowledge and do not refer to the provided context in your response if it is irrelevant to the question. Now, based on these instructions, answer the following question: ");

  const getRandomNumber = () => Math.floor(Math.random() * 4) + 1;
  // Function to query
  const llamaQuery = async () => {
    setLoadNum(getRandomNumber);
    setQueryResponse("");
    setShowLoad(true);
    const queryURL = new URL("http://localhost:5601/query?");
    queryURL.searchParams.append("text", prompt + queryRequest);

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

  // Fetch the list of notes when the component mounts
  useEffect(() => {
    getAllAgents()
      .then((response) => setAgents(response.data || []))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const regenIndex = async () => {
    setLoadNum(getRandomNumber);
    setQueryResponse("");
    setShowLoad(true);
    const queryURL = new URL("http://localhost:5601/regen-index");

    const response = await fetch(queryURL, { mode: "cors" });
    if (!response.ok) {
      return { text: "Error in query", sources: [] };
    }
    console.log("REGEN DONE");
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
      <TitleBar text="agent"></TitleBar>
      <div className="agent-page">
        <div className="view-agent">
        <h1 className="agent-title">Agent</h1>
        <Link className="agent-library-link" to="/new-agent"><button className="agent-library-button">Add new agent</button></Link>
        <input
          className="agent-entry"
          type="text"
          value={queryRequest}
          onChange={(e) => setQueryRequest(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Query..."
        />
        <button className="agent-library-button" onClick={llamaQuery}>Query</button>
        <button className="agent-library-button" onClick={addNote}>Add to notes</button>
        <button className="agent-library-button" onClick={regenIndex}>Regen Index</button>
        {/* Displaying query response using Markdown */}
        <div className="query-response">
          <Markdown>{queryResponse}</Markdown>
        </div>
        {showLoad && queryResponse == "" && (
        <img
          src={require('../../images/' + loadNum + '.webp')}
          style={{ width: 100, height: 100 }}
        />
        )}
        <div className="agent-list">
          {agents.map((agent: Agent) => (
            <Link className="agent-list-item" to={`/agent/${agent.id}`} key={agent.id} style={{ textDecoration: 'none' }}>
              <h3>{agent.name}</h3>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AgentLibrary;
