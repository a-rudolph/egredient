import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { exampleRecipe } from "./globals.js";

const Tile = styled.div`
  width: 30vw;
  background-color: #dee9ed;
`;

class RecipePreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tile>
        <div className="image">
          <img src={exampleRecipe.image}></img>
        </div>
        <h2>{exampleRecipe.title}</h2>
      </Tile>
    );
  }
}

export default RecipePreview;
