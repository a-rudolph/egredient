import React, { Component } from "react";
import styled from "styled-components";

const Background = styled.div`
  .container {
    margin: 0;
    padding: 0;
    div {
      background-color: whitesmoke;
    }
    .title {
      padding: 0 60px;
      margin-top: 30px;
      border-bottom: 1px solid;
      border-top: 1px solid #6393a6;
      align-items: flex-end;
      h2 {
        margin: 0;
      }
      div {
        height: min-content;
      }
    }
    .middle,
    .list {
      padding: 0 60px;
    }
    .hide {
      transform: scaleY(0);
      transform-origin: top;
      height: 0;
    }
    .show {
      transform: scaleY(1);
      transform-origin: top;
      height: auto;
    }
    .list {
      transition: all 0.3s ease-in-out;
    }
    .flex {
      display: flex;
    }
    h2#ingredients,
    h2#steps {
      margin: 0;
      padding: 0 60px;
      border-bottom: 1px solid;
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
    this.state = { ingredients: false, steps: false };
    this.recipe = {
      title: "Hungarian Mushroom Soup",
      chef: "Le Chadam",
      description:
        "\nMy family loves soup and this is one of their favorites. It has lots of flavor and is fairly quick to make. It's primarily a mushroom soup but derives a lot of its flavor from other ingredients.        ",
      image: "https://images.media-allrecipes.com/userphotos/560x315/8261.jpg",
      tags: ["Soups, Stews and Chili", "Soup", "Vegetable Soup"],
      ingredients: [
        "4 tablespoons unsalted butter",
        "2 cups chopped onions",
        "1 pound fresh mushrooms, sliced",
        "2 teaspoons dried dill weed",
        "1 tablespoon paprika",
        "1 tablespoon soy sauce",
        "2 cups chicken broth",
        "1 cup milk",
        "3 tablespoons all-purpose flour",
        "1 teaspoon salt",
        "ground black pepper to taste",
        "2 teaspoons lemon juice",
        "1/4 cup chopped fresh parsley",
        "1/2 cup sour cream"
      ],
      steps: [
        "Melt the butter in a large pot over medium heat. Saute the onions in the butter for 5 minutes. Add the mushrooms and saute for 5 more minutes. Stir in the dill, paprika, soy sauce and broth. Reduce heat to low, cover, and simmer for 15 minutes.",
        "In a separate small bowl, whisk the milk and flour together. Pour this into the soup and stir well to blend. Cover and simmer for 15 more minutes, stirring occasionally.",
        "Finally, stir in the salt, ground black pepper, lemon juice, parsley and sour cream. Mix together and allow to heat through over low heat, about 3 to 5 minutes. Do not boil. Serve immediately."
      ],
      date: new Date(),
      rid: "1413545345"
    };
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
  clickHandler = ev => {
    let newState = { ...this.state, [ev.target.id]: !this.state[ev.target.id] };
    console.log(newState);
    this.setState(newState);
  };
  render() {
    return (
      <Background className="background">
        <div className="container">
          <div className="flex title">
            <h2>{this.recipe.title}</h2>
            <div>{this.recipe.chef /**TURN THIS TO A LINK EVENTUALLY*/}</div>
          </div>
          <div className="flex middle">
            <img src={this.recipe.image} />
            <div className="description">{this.recipe.description}</div>
          </div>
          <h2 id="ingredients" onClick={this.clickHandler}>
            Ingredients
          </h2>
          <div
            id="ingredients"
            className={"list " + (this.state.ingredients ? "show" : "hide")}
          >
            {this.renderIngredients()}
          </div>
          <h2 id="steps" onClick={this.clickHandler}>
            Steps
          </h2>
          <div
            id="steps"
            className={"list " + (this.state.steps ? "show" : "hide")}
          >
            {this.renderSteps()}
          </div>
        </div>
      </Background>
    );
  }
}

export default Recipe;
