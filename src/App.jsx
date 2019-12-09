import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar.jsx";
import Auth from "./Auth.jsx";
import Landing from "./Landing.jsx";
import RecipeForm from "./RecipeForm.jsx";
import Recipe from "./Recipe.jsx";
import Browse from "./Browse.jsx";
import Search from "./Search.jsx";
import { LOGIN, RECIPES } from "./globals.js";

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
    fetch("/get-recipes")
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let recipes = JSON.parse(body);
        this.props.loadRecipes(recipes);
      });
  }
  findRecipeById = id => {
    return this.props.recipes.filter(recipe => {
      return id == recipe.rid;
    })[0];
  };
  renderRecipe = routerData => {
    let id = routerData.match.params.rid;
    let recipe = this.findRecipeById(id);
    if (recipe !== undefined) {
      return <Recipe recipe={recipe} />;
    }
    return <Browse />;
  };
  renderNewRecipe = () => {
    return (
      <div className="background">
        <RecipeForm />
      </div>
    );
  };

  render = () => {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Auth />
          <div className="content">
            <Route exact={true} path="/" render={() => <Landing></Landing>} />
            <Route exact={true} path="/recipes" render={() => <Browse />} />
            <Route
              exact={true}
              path="/new-recipe"
              render={this.renderNewRecipe}
            />
            <Route exact={true} path="/ingredients" render={() => <Search />} />
            <Route
              exact={true}
              path="/recipe/:rid"
              render={this.renderRecipe}
            />
          </div>
        </BrowserRouter>
      </>
    );
  };
}

let mapStateToProps = st => {
  return {
    recipes: st.recipes
  };
};

let mapDispatchToProps = dispatch => {
  return {
    login: username => {
      dispatch({ type: LOGIN, username });
    },
    loadRecipes: recipes => {
      dispatch({ type: RECIPES, recipes });
    }
  };
};

let App = connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp);

export default App;
