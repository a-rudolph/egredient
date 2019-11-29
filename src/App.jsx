import React, { Component } from "react";
import RecipeForm from "./RecipeForm.jsx";
import Testing from "./Testing.jsx";

class App extends Component {
  render = () => {
    return (
      <div className="content">
        <RecipeForm />
      </div>
    );
  };
}

export default App;
