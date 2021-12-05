import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import  axios from 'axios';
import { useToken } from '../auth/useToken';

export const SignUpPage = () => {
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');
    const [firstNameValue, setFirstName] = useState('');
    const [lastNameValue, setLasttName] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const history = useHistory();

    const onSignUpClicked = async() => {
        
        const response = await axios.post('/api/signup', {
            first_name: firstNameValue, 
            last_name: lastNameValue,
            email: emailValue,
            password: passwordValue
        });

        const { token  } = response.data;
        setToken( token );
        history.push('/')
    };

    return (
        <div  className="page-container">
        <div className="content-container"> 
            <h1> Sign Up </h1>
            {errorMessage && <div className="fail"> {errorMessage} </div>}

            <input
                value={firstNameValue}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name*"
                type="text"
                required
            />

            <input
                value={lastNameValue}
                onChange={e => setLasttName(e.target.value)}
                placeholder="Last Name*"
                type="text"
                required
            />
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="Please enter a valid email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <input 
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password"
            />
            <input 
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                type="password"
                placeholder="Confirm your password"
            />
            <hr />            
            <button 
                disabled={
                    !emailValue || !passwordValue ||
                    passwordValue !==  confirmPasswordValue
                }
                onClick={onSignUpClicked}> Sign Up</button>
            <button 
                onClick={() => history.push('/login')}> Already have an account? Log In </button>
        </div>
        </div>
    )
};