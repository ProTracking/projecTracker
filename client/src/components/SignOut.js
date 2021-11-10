// @flow
import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { SignIn } from './SignIn';


export function SignOut() {
    const [auth, setAuth] = useState(false);
    
    const signOutGoogle = () =>{    
        firebase.auth().signOut().then(() => {
            setAuth(false);
            window.localStorage.setItem("auth", "false");
            window.location.href = '/';
        });
    }

  return (
    <div>
      
      {auth ? (
        <SignIn />
      ) : (
        <button onClick={signOutGoogle} > Log out with Google </button>
      )}
      
    </div>
  );
};