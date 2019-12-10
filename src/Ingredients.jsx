/**
 * using wiki api to get images for ingredients
 * /w/api.php?action=query&format=json&prop=pageimages&titles=parmesan&redirects=1&piprop=thumbnail%7Cname%7Coriginal
 */

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { RECIPES } from "./globals.js";
import Results from "./Results.jsx";

const Search = styled.div`
  .container {
    width: 100%;
    margin: 0;
  }
`;

class UnconnectedIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Search className="background">
        <div className="container"></div>
      </Search>
    );
  }
}

let mapDispatchToProps = disp => {
  return {};
};

let Ingredients = connect(null, mapDispatchToProps)(UnconnectedIngredients);

export default Ingredients;
