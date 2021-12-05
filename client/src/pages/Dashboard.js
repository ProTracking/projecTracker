import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DnD } from "../components/DND/DnD";
import { NavBar } from "../components/NavBar";
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';

export const Dashboard = () => {

  const user = useUser();
  const [token, setToken] = useToken();

  const { id } = user;

  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const history = useHistory();

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  useEffect(() => {
      getUser();
  }, [])

    const getUser = async () => {
        try {
            const response = await axios.get(`/api/user/${id}`, {
                
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setFirstName(response.data.data.rows[0].first_name)
            setLastName(response.data.data.rows[0].last_name)
            setShowSuccessMessage(true);

        } catch (error) {
            setShowErrorMessage(true);
        }
    }



  return (
    <>
      <NavBar data = {[firstName, lastName]}/>
      <DnD data = {[id, firstName, lastName, token]} />
    </>
  );
};
