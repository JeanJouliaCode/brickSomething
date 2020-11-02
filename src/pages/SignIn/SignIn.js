import {
  Link,
  useHistory, 
} from 'react-router-dom';

import React, { useState , useContext} from "react";
import { signInWithGoogle , getUserDocument , generateUserDocument} from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../firebase";

import './SignIn.css';


const SignIn = () => {

  let history = useHistory();
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    const {user} = await auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Wrong password or email");
      console.error("Error signing in with password and email", error);
    });

    history.push('/home');
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
          <h1 className="Roboto">Sign in</h1>
          {error !== null && <div className="">{error}</div>}
          <form className="">
            <div>
              <label htmlFor="userEmail" className="Roboto">
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
              <label htmlFor="userPassword" className="block Roboto">
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
              <span className="submitSpan Roboto btnText">Submit</span>
            </button>
          </form>

          <br></br>

          <p className="">
            <Link to="passwordReset" className="Roboto">
              Forgot Password?
          </Link>
          </p>
        </div>
        <div className="line"></div>
        <div className="formDiv centerContent">
          <Link to="signUp" className="signUpBtn">
            <button className="submitBtn" >
              <span className="submitSpan Roboto btnText">Sign up</span>
            </button>
          </Link>
          <br></br>
          <img onClick={ event => {
            signInUsingGoogle(event);
          }} src={require('../../assets/google-btn.png')} alt="google btn" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;