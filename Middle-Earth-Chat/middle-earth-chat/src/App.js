import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/posts`)
      .then(res => {
        console.log("App.js .get res", res);
      })

  })

  return (
    <div className="App">
      <h1>App.js</h1>
    </div>
  );
}

export default App;
