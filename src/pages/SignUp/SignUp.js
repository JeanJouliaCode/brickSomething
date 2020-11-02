import React, { useState, useContext } from "react";
import {
  Link,
  useHistory,
} from 'react-router-dom';
import '../SignIn/SignIn.css';
import './SignUp.css';

import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

const SignUp = () => {

  let history = useHistory();
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      const userDoc = await generateUserDocument(user, { displayName });
      userContext.setUserObject(userDoc);
      history.push('/home');
    }
    catch (error) {
      console.log(error);
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const signInUsingGoogle = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithGoogle();
      if (result) {
        const userDoc = await generateUserDocument(result.user, { "displayName": result.user.displayName });
        userContext.setUserObject(userDoc);
        history.push('/home');
      }
    }
    catch (error) {
      console.log(error);
      setError('Error Signing up with email and password');
    }
  };


  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="waveBackground fillspace">
      <div className="center signInDiv">
        <div className="formWideDiv">
          <h1 className="Roboto">Sign Up</h1>
          <div className="">
            {error !== null && (
              <div className="">
                {error}
              </div>
            )}
            <form className="">
              <label htmlFor="displayName" className="Roboto">
                Displayed name:
            </label>
              <br></br>
              <input
                type="text"
                className="input"
                name="displayName"
                value={displayName}
                placeholder="E.g: Faruq"
                id="displayName"
                onChange={event => onChangeHandler(event)}
              />
              <br></br>

              <label htmlFor="userEmail" className="Roboto">
                Email:
            </label>
              <input
                type="email"
                className="input"
                name="userEmail"
                value={email}
                placeholder="E.g: faruq123@gmail.com"
                id="userEmail"
                onChange={event => onChangeHandler(event)}
              />
              <label htmlFor="userPassword" className="Roboto">
                Password:
            </label>
              <input
                type="password"
                className="input"
                name="userPassword"
                value={password}
                placeholder="Your Password"
                id="userPassword"
                onChange={event => onChangeHandler(event)}
              />
              <button
                className="submitBtn"
                onClick={event => {
                  createUserWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                <span className="submitSpan Roboto btnText">Submit</span>
              </button>
            </form>
            <br></br>
            <div className="signUpGoogleTxt">
              <p className="Roboto">or</p>
            </div>

            <img className="centerImage" onClick={event => {
              signInUsingGoogle(event);
            }} src={require('../../assets/google-btn.png')} alt="google btn" />

            <div className="signUpGoogleTxt">
              <p className="">
                Already have an account?{" "}
                <Link to="/SIgnIn" className="">
                  Sign in here
            </Link>{" "}
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>

  );
};

export default SignUp;