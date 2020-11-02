import React from "react";
import { UserContext } from "../../providers/UserProvider";
import './userInfo.css';
class UserInfo extends React.Component  {

  static contextType = UserContext;

  constructor(props) {
    super(props);
  }

  render(){
    if( this.context && this.context.user){
      
      const { user } = this.context;

      return (
        <div className="infoDiv">
          <div className="">
            <img src={user.photoURL || require('../../assets/noProfile.jpg')} className="profilPic"></img>
          </div>
          <span className="Roboto displayName">{user.displayName}</span>
    
        </div>
      );
    }
    else{
      return (
        <div className="infoDiv">

        </div>
      );
    }
    

  }

};
export default UserInfo;