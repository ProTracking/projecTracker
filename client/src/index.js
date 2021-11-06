import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './config/firebase-config'
import App from './App';
import 'firebaseui/dist/firebaseui.css'


ReactDOM.render(
    <Fragment>
      <App />
    </Fragment>,
  document.getElementById('root')
);

