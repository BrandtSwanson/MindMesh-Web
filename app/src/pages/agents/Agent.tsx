import React, { useEffect, useState } from "react";
import "../../styles/agents/AgentLibrary.css";
import "../../styles/global/App.css";
import TitleBar from "../../components/TitleBar";
import { createNote, deleteAgent, getAgentById, getAllAgents } from "../../api/api";
import Markdown from 'react-markdown'
import { Link, useNavigate, useParams } from "react-router-dom";

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

const Agent = ({}: Props) => {
  const [queryRequest, setQueryRequest] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [showLoad, setShowLoad] = useState(false);
  const [loadNum, setLoadNum] = useState(1);
  const [conversation, setConversation] = useState<string[]>([]);
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<Agent>({
    id: parseInt(agentId),
    name: '',
    description: '',
    prompt: '',
    doc_limit: 0,
    distance_limit: 0,
    data_sources: []
  });

  const getRandomNumber = () => Math.floor(Math.random() * 4) + 1;
  // Function to query
  const llamaQuery = async () => {
    setLoadNum(getRandomNumber);
    setConversation([...conversation, queryResponse + " "]);
    setQueryResponse("");
    setShowLoad(true);
    const query = agent.prompt + ": " + queryRequest + ". Past conversation for context: " + conversation.toString();
    console.log(query);
    const queryURL = new URL("http://192.168.4.85:5601/query?");
    queryURL.searchParams.append("text", query);

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
    setConversation([...conversation, queryRequest + " "]);
  };

  const handleDeleteClick = () => {
    deleteAgent(parseInt(agentId));
    navigate("/agents");
  }

  const handleEditClick = () => {
    navigate(`/agents/e/${agentId}`);
  }

  // Fetch the list of notes when the component mounts
    useEffect(() => {
        // Fetch the agent by id and store the prompt
        getAgentById(parseInt(agentId)).then((fetchedAgent) => {
            if (fetchedAgent) {
            console.log("GETS HERE");
            setAgent(fetchedAgent); 
            }
        });
    }, []);

  const regenIndex = async () => {
    setLoadNum(getRandomNumber);
    setQueryResponse("");
    setShowLoad(true);
    const queryURL = new URL("http://192.168.4.85:5601/regen-index");

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
            <h1 className="agent-title">{agent.name}</h1>
            <button className="agent-button" onClick={handleEditClick}>Edit</button>
            <button className="agent-button" onClick={handleDeleteClick}>Delete</button>
            <input
            className="agent-entry"
            type="text"
            value={queryRequest}
            onChange={(e) => setQueryRequest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Query..."
            />
            <div className="gap"></div>
            <button className="agent-button" onClick={llamaQuery}>Query</button>
            <button className="agent-button" onClick={addNote}>Add to notes</button>
            <button className="agent-button" onClick={regenIndex}>Regen Index</button>
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
    </div>
  );
};

export default Agent;
