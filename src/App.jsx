import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm.jsx";
import Navbar from "./Navbar.jsx";
import Auth from "./Auth.jsx";
import Testing from "./Testing.jsx";
import { LOGIN } from "./globals.js";

class UnconnectedApp extends Component {
  componentDidMount() {
    fetch("/checkCookie", {
      method: "POST",
      body: "checking cookie",
      credentials: "include"
    })
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let response = JSON.parse(body);
        if (response.success) {
          this.props.login(response.username);
        }
      });
  }
  renderHome = () => {};
  renderBrowse = () => {};
  renderRecipe = () => {};
  renderNewRecipe = () => {
    return <RecipeForm />;
  };

  render = () => {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Auth />
          <div className="content">
            <Route exact={true} path="/" render={this.renderHome} />
            <Route
              exact={true}
              path="/newRecipe"
              render={this.renderNewRecipe}
            />
          </div>
        </BrowserRouter>
      </>
    );
  };
}

let mapDispatchToProps = dispatch => {
  return {
    login: username => {
      dispatch({ type: LOGIN, username });
    }
  };
};

let App = connect(null, mapDispatchToProps)(UnconnectedApp);

export default App;
