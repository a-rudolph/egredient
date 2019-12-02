import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MODAL, LOGIN } from "./globals";

const Auth = styled.div`
  opacity: 0;
  visibility: hidden;
  z-index: -1;
  animation: ${props => {
    if (props.show !== "none") return "appear .3s ease forwards";
    return "0";
  }};
  @keyframes appear {
    1% {
      z-index: 15;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  .modal-content {
    background-color: rgba(255, 255, 255);
    border-radius: 10px;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 300px;
    text-align: center;
    #close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    #close:hover {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

const INITIAL_STATE = {
  loginUsername: "",
  loginPassword: "",
  signupUsername: "",
  signupPassword: "",
  confirmPassword: ""
};

class UnconnectedAuth extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  changeHandler = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };
  loginHandler = ev => {
    ev.preventDefault();
    let username = this.state.loginUsername;
    console.log("submitting login");
    let data = new FormData();
    data.append("username", username);
    data.append("password", this.state.loginPassword);
    fetch("/login", { method: "POST", body: data, credentials: "include" })
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let response = JSON.parse(body);
        if (response.success) {
          console.log("successful login");
          this.props.login(username);
          this.closeHandler();
          return;
        }
        console.log("failed login");
        alert("invalid username or password");
      });
  };
  signupHandler = ev => {
    ev.preventDefault();
    console.log("submitting signup");
    if (this.state.signupPassword !== this.state.confirmPassword) {
      alert("passwords don't match");
      return;
    }
    let username = this.state.signupUsername;
    let data = new FormData();
    data.append("username", username);
    data.append("password", this.state.signupPassword);
    fetch("/signup", { method: "POST", body: data })
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let response = JSON.parse(body);
        if (response.success) {
          this.props.login(username);
          this.closeHandler();
          return;
        }
        alert("invalid username or password");
      });
  };
  closeHandler = () => {
    this.setState(INITIAL_STATE);
    this.props.close();
  };
  renderForm = () => {
    if (this.props.display === "login") {
      return (
        <>
          <h3>Login</h3>
          <div className="form-holder">
            <form onSubmit={this.loginHandler}>
              <input
                type="text"
                placeholder="Username"
                id="loginUsername"
                value={this.state.loginUsername}
                onChange={this.changeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                id="loginPassword"
                value={this.state.loginPassword}
                onChange={this.changeHandler}
              />
              <input
                type="submit"
                className="button"
                value="log me in!"
              ></input>
            </form>
          </div>
          <a onClick={this.props.toSignup}>Don't have an account?</a>
        </>
      );
    }
    return (
      <>
        <h3>Sign up</h3>
        <div className="form-holder">
          <form onSubmit={this.signupHandler}>
            <input
              type="text"
              placeholder="Username"
              id="signupUsername"
              value={this.state.signupUsername}
              onChange={this.changeHandler}
            />
            <input
              type="password"
              placeholder="Password"
              id="signupPassword"
              value={this.state.signupPassword}
              onChange={this.changeHandler}
            />
            <input
              type="password"
              placeholder="confirm password"
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.changeHandler}
            />
            <input type="submit" className="button" value="sign me up!"></input>
          </form>
        </div>
        <a onClick={this.props.toLogin}>Already have an account?</a>
      </>
    );
  };

  render() {
    // console.log("rendering with state, ", this.state);
    return (
      <>
        <Auth className="modal" show={this.props.display}>
          <div className="modal-content">
            <span id="close" onClick={this.closeHandler}>
              &times;
            </span>
            {this.renderForm()}
          </div>
        </Auth>
      </>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch({ type: MODAL, display: "none" });
    },
    toSignup: () => {
      dispatch({ type: MODAL, display: "signup" });
    },
    toLogin: () => {
      dispatch({ type: MODAL, display: "login" });
    },
    login: username => {
      dispatch({ type: LOGIN, username });
    }
  };
};

let mapStateToProps = st => {
  return {
    display: st.modal
  };
};
let Modal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAuth);

export default Modal;
