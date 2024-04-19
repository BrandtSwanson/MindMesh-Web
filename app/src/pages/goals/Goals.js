import React, { useEffect, useState } from "react";
import "../../styles/goals/GoalsPage.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { createGoal, getGoals, deleteGoal } from "../../api/api";
import LeftNav from "../../components/LeftNav";

function Goals() {
  const [goals, setGoals] = useState([]); // Array to store goals
  const [newGoalText, setNewGoalText] = useState(""); // Input field for creating a new goal
  const [newGoalTitle, setNewGoalTitle] = useState(""); // Input field for creating a new goal

  // Fetch the list of goals when the component mounts
  useEffect(() => {
    getGoals()
      .then((response) => setGoals(response.data || []))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  // Function to add a new goal
  const addGoal = () => {
    if (newGoalText.trim() !== "") {
      if(newGoalTitle.trim() !== "") {
      // Create a new goal object with a unique ID
      const newGoal = {
        id: Date.now(),
        title: newGoalTitle,
        content: newGoalText,
        // Add more properties as needed (e.g., createdAt, updatedAt)
      };

      createGoal(newGoal)
        .then((response) => {
          // Update the state to include the new goal
          setGoals([...goals, newGoal]);
          setNewGoalText(""); // Clear the input field
          setNewGoalTitle("");
        })
        .catch((error) => console.error("Error creating goal:", error));
    } else {
        // Create a new goal object with a unique ID
      const newGoal = {
        id: Date.now(),
        title: "Quick jot: " + newGoalText.substring(0,10),
        content: newGoalText,
        // Add more properties as needed (e.g., createdAt, updatedAt)
      };

      createGoal(newGoal)
        .then((response) => {
          // Update the state to include the new goal
          setGoals([...goals, newGoal]);
          setNewGoalText(""); // Clear the input field
          setNewGoalTitle("");
        })
        .catch((error) => console.error("Error creating goal:", error));
    }
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addGoal();
    }
  };

  // Function to delete a goal by ID
  const deleteGoalById = (id) => {
    deleteGoal(id)
      .then(() => {
        setGoals(goals.filter((goal) => goal.id !== id));
      })
      .catch((error) => console.error("Error deleting goal:", error));
  };

  return (
    <div className="app">
      <LeftNav></LeftNav>
      <div className="goals">
        <h1>My Goals</h1>
        <input
          type="text"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new goal title..."
        />
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new goal..."
        />
        <button onClick={addGoal}>Add Goal</button>

        {/* List of goals */}
        <ul>
        {goals && goals.length > 0 && (
          goals.map((goal) => (
            <li key={goal.id}>
              <Link to={`/goals/${goal.id}`}>{goal.title}</Link>
              <button onClick={() => deleteGoalById(goal.id)}>Delete</button>
            </li>
          ))
        )}
        </ul>
      </div>
    </div>
  );
}

export default Goals;
