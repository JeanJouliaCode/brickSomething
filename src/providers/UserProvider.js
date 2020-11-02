import React, { Component, createContext } from "react";
import { auth , getUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    auth.onAuthStateChanged( async (userAuth )=> {
      console.log('state changed')
      if(userAuth){
        const userDoc = await getUserDocument(userAuth.uid);
        this.setState({ user: userDoc});
      }
    });
  };

  setUserObject = (userInfo) =>{
    this.setState({ user: userInfo});
  }

  render() {
    const { user } = this.state;
    const { setUserObject } = this;
    return (
      <UserContext.Provider value={{user ,setUserObject}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;