import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import RecipeForm from "./RecipeForm.jsx";
import Navbar from "./Navbar.jsx";
import Testing from "./Testing.jsx";

class App extends Component {
  componentDidMount() {
    //checkCookie for autologin
  }
  renderBrowse = () => {};
  renderRecipe = () => {};

  render = () => {
    return (
      <>
        <BrowserRouter>
          <Navbar></Navbar>
          <div className="content">{/* <RecipeForm /> */}</div>
        </BrowserRouter>
      </>
    );
  };
}

export default App;
