import {
  Link,
} from 'react-router-dom';

import React, { useState } from "react";
import { signInWithGoogle } from "../../firebase";
import { auth } from "../../firebase";
import './SignIn.css';


const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };


  return (
    <div className="waveBackground fillspace">
      <div className="center signInDiv">
        <div className="formDiv">
          <h1 className="">Sign In</h1>
          {error !== null && <div className="">{error}</div>}
          <form className="">
            <div>
              <label htmlFor="userEmail" className="block">
                Email:
            </label>
              <br></br>
              <input
                type="email"
                className="input"
                name="userEmail"
                value={email}
                placeholder="E.g: faruq123@gmail.com"
                id="userEmail"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>

            <div>
              <label htmlFor="userPassword" className="block">
                Password:
            </label>
              <br></br>
              <input
                type="password"
                className="input"
                name="userPassword"
                value={password}
                placeholder="Your Password"
                id="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>

            <button className="submitBtn" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
              <span  className="submitSpan">Sign in</span> 
          </button>
          </form>

          <img onClick={() => {
            signInWithGoogle();
          }} src={require('../../assets/google-btn.png')} alt="google btn" />

          <p className="">
            Don't have an account?{" "}
            <Link to="signUp" className="">
              Sign up here
          </Link>{" "}
            <br />{" "}
            <Link to="passwordReset" className="">
              Forgot Password?
          </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignIn;