import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { MODAL, LOGOUT } from "./globals.js";

const Nav = styled.div`
  display: grid;
  position: fixed;
  top: 0;
  width: 100%;
  grid-template-columns: auto auto 1fr auto auto auto 50px;
  background-color: chartreuse;
  .nav-elem {
    padding: 15px;
    text-decoration: none;
    color: black;
    &:hover {
      background-color: #0e2616;
      color: whitesmoke;
    }
  }
  .dropdown {
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    min-width: 80px;
    .dropdown-elem {
      display: inline-block;
      background-color: pink;

      padding: 15px;
      text-decoration: none;
      color: black;
      border: none;
      width: 100%;
      &:hover {
        background-color: #0e2616;
        color: whitesmoke;
      }
    }
  }
  .dropdown:hover {
    .dropdown-content {
      display: block;
    }
  }
`;

class UnconnectedNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "none" };
  }

  renderDropdown = () => {
    if (this.props.isLoggedIn) {
      return (
        <div className="dropdown-content">
          <Link className="dropdown-elem" id="favs" to="/">
            favourites
          </Link>
          <Link className="dropdown-elem" id="new-recipe" to="/">
            new recipe
          </Link>
          <Link className="dropdown-elem" id="settings" to="/">
            settings
          </Link>
          <button
            className="dropdown-elem"
            id="logout"
            onClick={this.props.logout}
          >
            logout
          </button>
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
        <div id="placeholder"></div>
        <Link className="nav-elem" id="recipes" to="/recipes">
          recipes
        </Link>
        <Link className="nav-elem" id="ingredients" to="/ingredients">
          ingredients
        </Link>
        <div className="dropdown">
          <div className="nav-elem" id="user">
            <FaCaretDown />
          </div>
          {this.renderDropdown()}
        </div>
        <div id="placeholder"></div>
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