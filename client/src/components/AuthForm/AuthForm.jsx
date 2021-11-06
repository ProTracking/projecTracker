import React, { useState, Fragment, useEffect } from "react";
import { Card, Menu, Form, Button } from "semantic-ui-react";
import { auth, authUI } from "../../config/firebase-config";
import { useHistory } from 'react-router-dom';
import "./AuthForm.css";
import firebase from "firebase/compat/app";
// import { Dashboard } from "../../pages/Dashboard/Dashboard";
// import Navbar from "../Navbar";



async function authenticateUser(email, password, isLogin) {
  try {
    const user = isLogin
      ? await auth.signInWithEmailAndPassword(email, password)
      : await auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

// function renderLoggedIn() {
//   return (
//     <div className="loggedIn-wrapper">
//     <h1>You are logged in!</h1>
//     <div>
//       <Button onClick={() => auth.signOut()} color="yellow">
//         Log out
//       </Button>
//     </div>
//   </div> 
//   );
// }

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const history = useHistory();

  auth.onAuthStateChanged((user) => setUser(user));

  useEffect(() => {
    if (!user) {
      authUI.start(".google-login", {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        signInFlow: "redirect",
      });
    }
  }, [user]);

  return (
    <div className="auth-form-wrapper">
      <Card className="auth-form-card">
        <Card.Content>
          {user ? (
            history.push('/dashboard')
            // renderLoggedIn()
          ) : (
            <Fragment>
              <Menu compact secondary>
                <Menu.Item
                  name="Login"
                  onClick={() => setIsLogin(true)}
                  active={isLogin}
                ></Menu.Item>
                <Menu.Item
                  name="Sign up"
                  onClick={() => setIsLogin(false)}
                  active={!isLogin}
                ></Menu.Item>
              </Menu>
              {isLogin ? (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="loginEmail"
                        type="email"
                        value={loginEmail || ""}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="loginPassword"
                        type="password"
                        value={loginPassword || ""}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      onClick={() => authenticateUser(loginEmail, loginPassword, true)}
                      className="auth-form-buttons"
                      color="green"
                    >
                      Login
                    </Button>
                  </Form>
                  <div className="google-login"></div>

                </Fragment>
              ) : (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="signUpEmail"
                        type="email"
                        value={signupEmail || ""}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="signUpPassword"
                        type="password"
                        value={signupPassword || ""}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      className="auth-form-buttons"
                      color="teal"
                      onClick={() => authenticateUser(signupEmail, signupPassword, false)}
                    >
                      Sign up
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              )}
            </Fragment>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}

export default AuthForm;


    // "@testing-library/jest-dom": "^5.14.1",
    // "@testing-library/react": "^11.2.7",
    // "@testing-library/user-event": "^12.8.3",
    // "axios": "^0.24.0",
    // "bootstrap": "^5.1.3",

    // "react": "^17.0.2",
    // "react-bootstrap": "^2.0.1",
    // "react-dom": "^17.0.2",
    // "react-icons": "^4.3.1",
    // "react-router-dom": "^5.3.0",
    // "react-scripts": "^4.0.3",
    // "styled-components": "^5.3.3",
    // "web-vitals": "^1.1.2"