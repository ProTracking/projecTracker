import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import firebase from "firebase/compat/app";
import { AuthProvider } from "./components/contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import PrivateRoute from './components/PrivateRoute';
import AuthForm from "./components/AuthForm/AuthForm";


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
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/" component={AuthForm} />
           
          </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
