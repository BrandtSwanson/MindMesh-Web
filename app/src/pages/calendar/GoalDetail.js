import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getGoals } from "../../api/api";

function GoalDetail() {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState(null);
  const { goalId } = useParams();

  useEffect(() => {
    // Fetch the list of goals when the component mounts
    getGoals()
      .then((response) => setGoals(response.data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  useEffect(() => {
    // Find the goal based on the ID in the URL params
    const selectedGoal = goals.find((n) => n.id === parseInt(goalId));
    setGoal(selectedGoal);
  }, [goalId, goals]);

  return (
    <div>
      {goal ? (
        <div>
          <h2>{goal.title}</h2>
          <p>{goal.content}</p>
        </div>
      ) : (
        <p>Goal not found</p>
      )}
      <Link to="/goals">Back to Goals</Link>
    </div>
  );
}

export default GoalDetail;
