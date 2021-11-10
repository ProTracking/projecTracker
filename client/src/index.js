import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import './config/firebase-config'
import App from './App';
import 'firebaseui/dist/firebaseui.css'



ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);

