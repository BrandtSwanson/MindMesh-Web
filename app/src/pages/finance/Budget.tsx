import React, { useEffect, useState } from "react";
import "../../styles/finance/Budget.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { getBudgets } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const Budget = ({}: Props) => {
  const [budget, setBudget] = useState([]); // Array to store Budget
  const [newBudgetText, setNewBudgetText] = useState(""); // Input field for creating a new note
  const [newBudgetTitle, setNewBudgetTitle] = useState(""); // Input field for creating a new note

  // Fetch the list of Budget when the component mounts
  useEffect(() => {
    getBudgets()
      .then((response) => setBudget(response.data || []))
      .catch((error) => console.error("Error fetching Budget:", error));
  }, []);

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="budget-page">
        <div className="budget-title">
            My Budget 
            <Link to={`/budget/0` }>
                <button className="budget-add-budget-button">Add Budget Item</button>
            </Link>
        </div>

        {/* List of Budget */}
        <ul className="budget-list">
        {budget && budget.length > 0 && (
          budget.map((note) => (
            <Link to={`/budget/${note.id}` } className="budget-list-title">
            <li className="budget-item" key={note.id}>
              {note.title}
            </li></Link>
          ))
        )}
        </ul>
      </div>
    </div>
  );
}

export default Budget;
