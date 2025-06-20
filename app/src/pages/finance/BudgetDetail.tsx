//Want to edit budget
//Want to delete accoutn (type in budget name for confirmation)
//View all associated transactions
//Create new transaction -> Takes to transaction page but prefills budget

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateBudgetItem, getBudgetItem, deleteBudgetItem, getTransactionsForBudgetItem } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import "../../styles/finance/Budget.css"

type Props = {
}

const BudgetDetail = ({}: Props) => {
  const [budget, setBudget] = useState(null);
  const [editing, setEditing] = useState(false); // Add state for editing
  const [editedContent, setEditedContent] = useState(""); // Add state for edited content
  const { budgetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of budgets when the component mounts
    if(parseInt(budgetId) == 0) {
        setEditing(true);
    }
    getBudgetItem()
      .then((response) => setBudget(response.data))
      .catch((error) => console.error("Error fetching budgets:", error));
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setEditedContent(budget.content);
  };

  const handleSave = () => {
    // Save the edited content
    // You can implement the save functionality here using an API call or any other method
    // For simplicity, let's just update the budget object in the state
    const updatedBudget = { ...budget, content: editedContent };
    setBudget(updatedBudget);
    updateBudgetItem();
    setEditing(false);
  };

  const handleDelete = () => {
    // Save the edited content
    // You can implement the save functionality here using an API call or any other method
    // For simplicity, let's just update the budget object in the state
    deleteBudgetItem();
    navigate("/budgets");
  };

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="budgets-detail-page">
        <div className="budgets-detail-view">
        {budget ? (
          <div>
            <div className="budgets-detail-title">{budget.title}</div>
            {editing ? (
              <input
                className="budgets-detail-quick-entry"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <p className="budgets-detail-description">{budget.content}</p>
            )}
            {editing ? (
              <button  className="budgets-detail-button"onClick={handleSave}>Save</button>
            ) : (
              <button  className="budgets-detail-button"onClick={handleEdit}>Edit</button>
            )}
          </div>
        ) : (
          <p>Budget not found</p>
        )}
        <button className="budgets-detail-button" onClick={handleDelete}>Delete</button>
        <Link to="/budgets">
          <button className="budgets-detail-button">Back to Budgets</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default BudgetDetail;
