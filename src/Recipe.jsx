import React, { Component } from "react";
import styled from "styled-components";
import Favourite from "./Favourite.jsx";

const Background = styled.div`
  .container {
    margin: 0;
    padding: 0;
    div {
      background-color: whitesmoke;
    }
    .top-line {
      display: grid;
      grid-template-columns: auto 1fr;
      padding: 0 60px;
      margin-top: 30px;
      border-bottom: 1px solid;
      border-top: 1px solid #6393a6;
    }
    .title {
      align-items: flex-end;
      h2 {
        margin: 0;
      }
      div {
        height: min-content;
      }
    }
    .heart {
      justify-content: flex-end;
    }
    .middle,
    .list {
      padding: 0 60px;
    }
    .flex {
      display: flex;
    }
    h2#ingredients,
    h2#steps {
      margin: 0;
      padding: 20px 60px 0 60px;
      border-bottom: 1px solid;
    }
    div#ingredients,
    div#steps {
      padding: 0 60px 20px 60px;
    }
    #ingredients {
      background-color: #dee9ed;
    }
    .description {
      padding: 5px;
    }
  }
`;

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.recipe = { ...this.props.recipe };
  }

  renderIngredients = () => {
    return this.recipe.ingredients.map((ingr, i) => {
      return <li key={i}>{ingr}</li>;
    });
  };
  renderSteps = () => {
    return this.recipe.steps.map((step, i) => {
      return <li key={i}>{step}</li>;
    });
  };
  render() {
    return (
      <Background className="background">
        <div className="container">
          <div className="top-line">
            <div className="flex title">
              <h2>{this.recipe.title}</h2>
              <div>
                {" " + this.recipe.chef /**TURN THIS TO A LINK EVENTUALLY*/}
              </div>
            </div>
            <div className="heart flex">
              {/* <Favourite rid={this.recipe.rid} /> */}
            </div>
          </div>
          <div className="flex middle">
            <img src={this.recipe.image} />
            <div className="description">"{this.recipe.description}"</div>
          </div>
          <h2 id="ingredients">Ingredients</h2>
          <div id="ingredients" className={"list"}>
            {this.renderIngredients()}
          </div>
          <h2 id="steps">Steps</h2>
          <div id="steps" className={"list"}>
            {this.renderSteps()}
          </div>
        </div>
      </Background>
    );
  }
}

export default Recipe;
