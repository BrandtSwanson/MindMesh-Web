import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

// Example API request in React using Axios
import axios from 'axios';



function App() {
  const [data, setData] = useState({});
  // Replace 'backend-url' with the actual URL of your Go backend
  const backendUrl = 'http://localhost:8080'; // or your deployed backend URL

  useEffect(() => {
    // Make an API request
    axios.get(`${backendUrl}/api/example`)
      .then((response) => {
        console.log(response.data);
        const { sentence } = response.data;
        setData(sentence);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The sentence is {JSON.stringify(data)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
