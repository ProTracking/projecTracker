import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import firebase from "firebase/compat/app";
import { AuthProvider } from "./components/contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import PrivateRoute from './components/PrivateRoute';
import AuthForm from "./components/AuthForm/AuthForm";
import NoMatch from "./pages/NoMatch/NoMatch";


function App() {
  let auth = useRef(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCre) => {
      if (userCre) {
        auth.current = true;

      }
    });
  }, []);

  return (
    <Container
      
      
    >
      <div className="w-100">
        <Router>
          <AuthProvider>
          <Switch>
          <Route exact path="/" component={AuthForm} /> 
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/about" component={Dashboard} />
          <PrivateRoute path="/page_1" component={Dashboard} />
          <PrivateRoute path="/page_2" component={Dashboard} />
          <PrivateRoute path="/page_3" component={Dashboard} />
          <Route component={NoMatch} />
          </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
