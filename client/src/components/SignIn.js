// @flow
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {  } from "firebase/compat/auth";
import {getAuth, GoogleAuthProvider , signInWithPopup} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { useHistory } from "react-router-dom";



export function SignIn() {
  const provider = new GoogleAuthProvider();
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");
  const [token, setToken] = useState("");
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCre) => {
      if (userCre) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCre.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);

  const loginWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((userCre) => {
        if (userCre) {
          setAuth(true);
          window.localStorage.setItem("auth", "true");
          history.push("/dashboard");
          // window.location.href = '/dashboard';
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential)
        // ...
      });

  };

  return (
    <div>
      {auth ? (
        <Dashboard token={ token } />
      ) : (
        <button onClick={loginWithGoogle}> Login with Google </button>
      )}
    </div>
  );
}
