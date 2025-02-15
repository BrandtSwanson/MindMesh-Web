import React, { useState, useEffect } from 'react';
import "../../styles/agents/AgentConfig.css"
import TitleBar from '../../components/TitleBar';
import { createAgent, getAgentById, getCollections, updateAgent } from "../../api/api";
import { Link, useParams, useNavigate } from "react-router-dom";

export interface Agent {
    id:number;
    name:string;     // Event name or title
    description:string; // Event description
    prompt:string
    doc_limit:number;
    distance_limit:number;
    data_sources:string[];   // List of attendee emails
}

interface AgentConfigProps {
}

const AgentConfig: React.FC<AgentConfigProps> = () => {
  // State to track edit mode
  const navigate = useNavigate();
  const [collections, setCollections] = useState<string[]>([])
  const { agentId } = useParams();

  // State to hold the event and edited event
  const [agent, setAgent] = useState<Agent>({
    id: -1,
    name: '',
    description: '',
    prompt: '',
    doc_limit: NaN,
    distance_limit: NaN,
    data_sources: []
  });

  const [editedAgent, setEditedAgent] = useState<Agent>({ ...agent });

  // Handler to save the changes
  const handleSaveClick = () => {
    setAgent(editedAgent); // Update the event with edited data
    onSave();
  };

  useEffect(() => {
    console.log("A" + agentId);
    // Fetch the agent by id and store the prompt
    if(agentId) {
      console.log("B");
      getAgentById(parseInt(agentId)).then((fetchedAgent) => {
        if (fetchedAgent) {
          console.log("GETS HERE" + fetchedAgent);
          setAgent(fetchedAgent);
          setEditedAgent(fetchedAgent); 
        }
      });
    console.log(agent);
    }
    getCollections().then((fetchedCollections) => {
      if (fetchedCollections) {
        setCollections(fetchedCollections.data);
      }
    });
  }, []);

  const onSave = () => {
    if (editedAgent.name.trim() !== "") {
      if (editedAgent.id == -1)
        {
        editedAgent.id = Date.now()
      console.log("HERE");
      createAgent(JSON.stringify(editedAgent), editedAgent.id)
        .then((response) => {
          // Update the state to include the new note
        })
        .catch((error) => console.error("Error creating note:", error));
        navigate(`/agent/${editedAgent.id}`);
    } 
    else {
      updateAgent(JSON.stringify(editedAgent), editedAgent.id)
      .then((response) => {
        // Update the state to include the new note
      })
      .catch((error) => console.error("Error creating note:", error));
      navigate(`/agent/${editedAgent.id}`);
    }
  }
  }


  // Handler to cancel editing
  const handleCancelClick = () => {
      navigate(`/agents`);
  };

  // Handler to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedAgent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Attributes needed for new agent
  //Name, prompt, number of docs limit, limit for distance, data sources

return (
  <div className="app">
    <TitleBar text=''></TitleBar>
    <div className="agent-config">
      <div className="view-agent-config">
        <input
          className="agent-config-input"
          type="text"
          name="name"
          value={editedAgent.name}
          onChange={handleChange}
          placeholder="Name*"
        />
        <input
          className="agent-config-input"
          type="text"
          name="description"
          value={editedAgent.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          className="agent-config-input"
          name="prompt"
          value={editedAgent.prompt}
          onChange={handleChange}
          placeholder="Prompt*"
        />
        <input
          className="agent-config-input"
          type="number"
          name="doc_limit"
          value={editedAgent.doc_limit}
          onChange={handleChange}
          placeholder="Document Limit"
        />
      
        {/* Distance Limit Input */}
        <input
          className="agent-config-input"
          type="number"
          name="distance_limit"
          value={editedAgent.distance_limit}
          onChange={handleChange}
          placeholder="Distance Limit"
        />
      
        {/* Data Sources Input (comma-separated) */}
        <input
          className="agent-config-input"
          type="text"
          name="data_sources"
          value={editedAgent.data_sources.join(', ')} // Display data sources as comma-separated
          onChange={(e) =>
            setEditedAgent((prev) => ({
              ...prev,
              data_sources: e.target.value.split(',').map((source) => source.trim()), // Split comma-separated data sources
            }))
          }
          placeholder="Data Sources (comma-separated)"
        />
        {/* Collections Multiselect */}
        <select
          className="agent-config-input"
          multiple
          name="collections"
          value={editedAgent.data_sources.join(', ')}
          onChange={(e) =>
            setEditedAgent((prev) => ({
              ...prev,
              data_sources: Array.from(e.target.selectedOptions, (option) => option.value), // Get selected options as an array
            }))
          }
        >
          {collections.map((collection) => (
            <option key={collection} value={collection}>
              {collection}
            </option>
          ))}
        </select>
        <button className="agent-config-button" onClick={handleSaveClick}>Save</button>
        <button className="agent-config-button" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  </div>
);
};

export default AgentConfig;
