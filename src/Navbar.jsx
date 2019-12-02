import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

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
    button,
    a {
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

  // renderNav = () =>{
  //     let ids = ["recipes", "ingredients", "user"]
  //     return ids.map(id => {
  //         if (id === this.state.active) {
  //             return <div id={id} key={id}>{id}</div>
  //         }
  //     return <div id={id} key={id}>{}</div>
  //     })
  // }
  renderDropdown = () => {
    if (this.state.isLoggedin) {
      return (
        <div className="dropdown-content">
          <Link id="favs" to="/">
            favourites
          </Link>
          <Link id="new-recipe" to="/">
            new recipe
          </Link>
          <Link id="settings" to="/">
            settings
          </Link>
          <button id="logout">logout</button>
        </div>
      );
    }
    return (
      <div className="dropdown-content">
        <button id="login">login</button>
        <button id="sign-up">sign up</button>
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

let mapStateToProps = st => {
  return {
    user: st.activeUser,
    isLoggedIn: st.loggedIn
  };
};

let Navbar = connect(mapStateToProps)(UnconnectedNavbar);

export default Navbar;
