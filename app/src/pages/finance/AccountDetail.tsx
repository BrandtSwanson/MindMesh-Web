//Want to edit account
//Want to delete accoutn (type in account name for confirmation)
//View all associated transactions
//Create new transaction -> Takes to transaction page but prefills account

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateAccount, getAccount, deleteAccount, getTransactionsForAccount } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import "../../styles/finance/Accounts.css"

type Props = {
}

const AccountDetail = ({}: Props) => {
  const [account, setAccount] = useState(null);
  const [editing, setEditing] = useState(false); // Add state for editing
  const [editedContent, setEditedContent] = useState(""); // Add state for edited content
  const { accountId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of accounts when the component mounts
    if(parseInt(accountId) == 0) {
        setEditing(true);
    }
    getAccount()
      .then((response) => setAccount(response.data))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setEditedContent(account.content);
  };

  const handleSave = () => {
    // Save the edited content
    // You can implement the save functionality here using an API call or any other method
    // For simplicity, let's just update the account object in the state
    const updatedAccount = { ...account, content: editedContent };
    setAccount(updatedAccount);
    updateAccount();
    setEditing(false);
  };

  const handleDelete = () => {
    // Save the edited content
    // You can implement the save functionality here using an API call or any other method
    // For simplicity, let's just update the account object in the state
    deleteAccount();
    navigate("/accounts");
  };

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="accounts-detail-page">
        <div className="accounts-detail-view">
        {account ? (
          <div>
            <div className="accounts-detail-title">{account.title}</div>
            {editing ? (
              <input
                className="accounts-detail-quick-entry"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <p className="accounts-detail-description">{account.content}</p>
            )}
            {editing ? (
              <button  className="accounts-detail-button"onClick={handleSave}>Save</button>
            ) : (
              <button  className="accounts-detail-button"onClick={handleEdit}>Edit</button>
            )}
          </div>
        ) : (
          <p>Account not found</p>
        )}
        <button className="accounts-detail-button" onClick={handleDelete}>Delete</button>
        <Link to="/accounts">
          <button className="accounts-detail-button">Back to Accounts</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default AccountDetail;
