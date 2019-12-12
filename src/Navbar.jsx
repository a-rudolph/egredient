import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch.jsx";
import { FaCaretDown } from "react-icons/fa";
import { MODAL, LOGOUT } from "./globals.js";

const Nav = styled.div`
  display: grid;
  z-index: 3;
  position: fixed;
  top: 0;
  width: 100%;
  grid-template-columns: auto auto 1fr auto auto auto;
  background-color: white;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  .nav-elem {
    padding: 15px;
    text-decoration: none;
    color: black;
  }
  a.nav-elem {
    div {
      position: relative;
      &:after {
        height: 1px;
        background: #0e2616;
        content: "";
        width: 100%;
        bottom: 0;
        left: 0;
        margin-top: 5px;
        position: absolute;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.4s;
      }
    }
    &:hover {
      div:after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  .dropdown {
    display: inline-block;
  }
  .dropdown-content {
    position: absolute;
    right: 0;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s;
    min-width: 80px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    .dropdown-elem {
      margin: 0;
      box-sizing: border-box;
      text-align: left;
      cursor: pointer;
      user-select: none;
      background-color: white;
      display: inline-block;
      padding: 15px;
      text-decoration: none;
      color: black;
      border: none;
      transition: all 0.1s;
      &:hover {
        background-color: #0e2616;
        color: whitesmoke;
      }
    }
  }
  .dropdown:hover {
    .dropdown-content {
      transform: scaleY(1);
      transform-origin: top;
    }
  }
`;

class UnconnectedNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "none" };
  }

  logoutHandler = () => {
    fetch("/logout")
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let response = JSON.parse(body);
        if (response.success) {
          this.props.logout();
          return;
        }
        alert("error logging out. try again");
      });
  };

  renderDropdown = () => {
    if (this.props.isLoggedIn) {
      return (
        <div className="dropdown-content">
          <Link className="dropdown-elem" id="favs" to="/favourites">
            favourites
          </Link>
          <Link className="dropdown-elem" id="new-recipe" to="/new-recipe">
            new recipe
          </Link>
          <Link className="dropdown-elem" id="settings" to="/">
            settings
          </Link>
          <a className="dropdown-elem" id="logout" onClick={this.logoutHandler}>
            logout
          </a>
        </div>
      );
    }
    return (
      <div className="dropdown-content">
        <button
          className="dropdown-elem"
          id="login"
          onClick={this.props.toLogin}
        >
          login
        </button>
        <button
          className="dropdown-elem"
          id="signup"
          onClick={this.props.toSignup}
        >
          sign up
        </button>
      </div>
    );
  };

  render() {
    return (
      <Nav>
        <Link className="nav-elem" id="logo" to="/">
          logo
        </Link>
        <Link className="nav-elem" id="name" to="/">
          ngredient
        </Link>
        <NavSearch />
        <Link className="nav-elem" id="recipes" to="/recipes">
          <div>recipes</div>
        </Link>
        <Link className="nav-elem" id="ingredients" to="/ingredients">
          <div>ingredients</div>
        </Link>
        <div className="dropdown">
          <div className="nav-elem" id="user">
            <FaCaretDown />
          </div>
          {this.renderDropdown()}
        </div>
      </Nav>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    toLogin: () => {
      dispatch({ type: MODAL, display: "login" });
    },
    toSignup: () => {
      dispatch({ type: MODAL, display: "signup" });
    },
    logout: () => {
      dispatch({ type: LOGOUT });
    }
  };
};

let mapStateToProps = st => {
  return {
    user: st.activeUser,
    isLoggedIn: st.loggedIn
  };
};

let Navbar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedNavbar);

export default Navbar;
