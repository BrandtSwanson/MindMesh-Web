import React, { useEffect, useState } from "react";
import "../../styles/finance/Transactions.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { createTransaction, getTransactions, deleteTransaction } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const Transactions = ({}: Props) => {
  const [Transactions, setTransactions] = useState([]); // Array to store Transactions
  const [newTransactionText, setNewTransactionText] = useState(""); // Input field for creating a new Transaction
  const [newTransactionTitle, setNewTransactionTitle] = useState(""); // Input field for creating a new Transaction

  // Fetch the list of Transactions when the component mounts
  useEffect(() => {
    getTransactions()
      .then((response) => setTransactions(response.data || []))
      .catch((error) => console.error("Error fetching Transactions:", error));
  }, []);

  // Function to add a new Transaction
  const addTransaction = () => {
    if (newTransactionText.trim() !== "") {
      if(newTransactionTitle.trim() !== "") {
      // Create a new Transaction object with a unique ID
      const newTransaction = {
        id: Date.now(),
        title: newTransactionTitle,
        content: newTransactionText,
        // Add more properties as needed (e.g., createdAt, updatedAt)
      };

      createTransaction()
        .then((response) => {
          // Update the state to include the new Transaction
          setTransactions([...Transactions, newTransaction]);
          setNewTransactionText(""); // Clear the input field
          setNewTransactionTitle("");
        })
        .catch((error) => console.error("Error creating Transaction:", error));
    } else {
        // Create a new Transaction object with a unique ID
      const newTransaction = {
        id: Date.now(),
        title: "Quick jot: " + newTransactionText.substring(0,10),
        content: newTransactionText,
        // Add more properties as needed (e.g., createdAt, updatedAt)
      };

      console.log("HERE B!");

      createTransaction()
        .then((response) => {
          // Update the state to include the new Transaction
          setTransactions([...Transactions, newTransaction]);
          setNewTransactionText(""); // Clear the input field
          setNewTransactionTitle("");
        })
        .catch((error) => console.error("Error creating Transaction:", error));
    }
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTransaction();
    }
  };

  // Function to delete a Transaction by ID
  const deleteTransactionById = (id) => {
    deleteTransaction(id)
      .then(() => {
        setTransactions(Transactions.filter((Transaction) => Transaction.id !== id));
      })
      .catch((error) => console.error("Error deleting Transaction:", error));
  };

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="transactions-page">
        <div className="transactions-title">My Transactions</div>
        <input className="transactions-quick-entry"
          type="text"
          value={newTransactionText}
          onChange={(e) => setNewTransactionText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new transaction..."
        />
        <button className="transaction-add-transaction-button" onClick={addTransaction}>Add Transaction</button>

        {/* List of Transactions */}
        <ul className="Transaction-list">
        {Transactions && Transactions.length > 0 && (
          Transactions.map((Transaction) => (
            <Link to={`/transactions/${Transaction.id}` } className="transactions-list-title">
            <li className="transaction-item" key={Transaction.id}>
              {Transaction.title}
              <button className="transaction-list-delete-button" onClick={() => deleteTransactionById(Transaction.id) }>Delete</button>
            </li></Link>
          ))
        )}
        </ul>
      </div>
    </div>
  );
}

export default Transactions;
