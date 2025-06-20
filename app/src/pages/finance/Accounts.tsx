import React, { useEffect, useState } from "react";
import "../../styles/finance/Accounts.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { getAccounts } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const Accounts = ({}: Props) => {
    // Want to fetch account list
    // Want to create a new account
    // Want to get account by id
  const [accounts, setAccounts] = useState([]); // Array to store Account

  // Fetch the list of Account when the component mounts
  useEffect(() => {
    getAccounts()
      .then((response) => setAccounts(response.data || []))
      .catch((error) => console.error("Error fetching Account:", error));
  }, []);

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="accounts-page">
        <div className="accounts-title">My Accounts <Link to={`/accounts/0` } className="accounts-list-title"><button className="note-list-delete-button">Create New Account</button></Link></div>
        {/* List of Account */}
       
        <ul className="note-list">
        {accounts && accounts.length > 0 && (
          accounts.map((account) => (
            <Link to={`/account/${account.id}` } className="accounts-list-title">
            <li className="note-item" key={account.id}>
              {account.title}
              {account.balance}
            </li></Link>
          ))
        )}
        </ul>
      </div>
    </div>
  );
}

export default Accounts;
