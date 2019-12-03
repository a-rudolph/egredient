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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
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
  h3 {
    text-align: left;
    padding-left: 60px;
    margin-bottom: 0.5rem;
  }
  .form-holder {
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      input {
        margin: 5px 20px;
        padding: 3px;
        background-color: whitesmoke;
        border: none;
        text-align: center;
        &:hover {
          outline: 1px solid rgba(0, 0, 0, 0.2);
        }
        &:focus {
          outline: 1px solid rgba(0, 0, 0, 0.2);
        }
      }
      button {
        margin: 0 20px 10px 20px;
      }
    }
  }
  a {
    text-decoration: underline;
    color: blue;
    cursor: pointer;
  }
  .invalid {
    content: ${props => {
      if (props.invalid) return "invalid username or password";
      return "";
    }};
    font-size: small;
    color: red;
    min-height: 1rem;
  }
`;

const INITIAL_STATE = {
  loginUsername: "",
  loginPassword: "",
  signupUsername: "",
  signupPassword: "",
  confirmPassword: "",
  loginMsg: "",
  signupMsg: ""
};

class UnconnectedAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
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
        this.setState({ loginMsg: "invalid username or password" });
      });
  };
  signupHandler = ev => {
    ev.preventDefault();
    console.log("submitting signup");
    if (this.state.signupPassword !== this.state.confirmPassword) {
      this.setState({ signupMsg: "please enter matching passwords" });
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
        this.setState({ signupMsg: "username is taken" });
      });
  };
  closeHandler = () => {
    this.setState({ ...INITIAL_STATE });
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
                autoFocus
                type="text"
                placeholder="username"
                id="loginUsername"
                value={this.state.loginUsername}
                onChange={this.changeHandler}
              />
              <input
                type="password"
                placeholder="password"
                id="loginPassword"
                value={this.state.loginPassword}
                onChange={this.changeHandler}
              />
              <div className="invalid">{this.state.loginMsg}</div>
              <button type="submit" className="button">
                log me in
              </button>
            </form>
            <a onClick={this.props.toSignup}>Don't have an account?</a>
          </div>
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
              placeholder="username"
              id="signupUsername"
              value={this.state.signupUsername}
              onChange={this.changeHandler}
            />
            <input
              type="password"
              placeholder="password"
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
            <div className="invalid">{this.state.signupMsg}</div>
            <button type="submit" className="button">
              sign me up!
            </button>
          </form>
          <a onClick={this.props.toLogin}>Already have an account?</a>
        </div>
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
