import { Link, withRouter } from 'react-router-dom';
import React from "react";
import { UserContext } from "../../providers/UserProvider";
import './userInfo.css';
import { auth } from "../../firebase";

class UserInfo extends React.Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      droppedDown: false
    }

    this.dropDownRef = React.createRef();
    this.dropDownBtnRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', (event) => { this.handleClickOutside(event) }, true);
  }

  toggle(event) {
    this.setState({ droppedDown: !this.state.droppedDown })
  };

  handleClickOutside(event) {
    if (this.dropDownRef.current && !this.dropDownRef.current.contains(event.target) && !this.dropDownBtnRef.current.contains(event.target)) {
      console.log('clicked')
      this.setState({ droppedDown: false });
    }
  };

  clickResetPassword(event) {
    this.setState({ droppedDown: false })

  }

  clickSignOff(event) {
    auth.signOut();
    this.setState({ droppedDown: false })
  }

  goTo(path) {
    this.props.history.push({
      pathname: path,
    });
  }

  render() {
    const path = this.props.location.pathname.slice(1);

    if (path === "signIn" || path === "signUp" || path === "passwordReset") {
      return <div></div>
    };

    if (this.context && this.context.user) {

      const { user } = this.context;

      return (
        <div>
          <div className="infoDiv">
            <div className="PicAndName noselect" onClick={event => this.toggle(event)} ref={this.dropDownBtnRef}>
              <img src={user.photoURL || require('../../assets/noProfile.jpg')} className="profilPic"></img>
              <span className="Roboto displayName">{user.displayName}</span>
            </div>
          </div>
          <div ref={this.dropDownRef} ><DropdownMenu resetPassword={(event) => { this.clickResetPassword(event) }} signOff={(event) => { this.clickSignOff(event) }} displayed={this.state.droppedDown} /></div>

        </div>
      );
    }
    else {
      return (
        <div className="infoDiv">
          <Link class="linkSignIn" to="/signIn"><button className="signInBtn" ><span className="signInBtnText noselect">Sign in</span></button></Link>
        </div>
      );
    }
  }
};

const DropdownMenu = (props) => {
  const { displayed, resetPassword, signOff } = props;

  if (!displayed) { return <div></div>; };

  return <div className="dropDownMenu">
    <Link to="/passwordReset" className="linkSignIn"><div className="tile" onClick={resetPassword}><span className="tileText">Reset password</span></div></Link>
    <Link to="/home" className="linkSignIn"><div className="tile" onClick={signOff}><span className="tileText" >Sign off</span></div></Link>


  </div>
}

export default withRouter(UserInfo);