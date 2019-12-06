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
      height: 0;
      transform: scaleY(0);
      transform-origin: top;
    }
    .show {
      transform: scaleY(1);
      transform-origin: top;
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
      title: "Kale, Quinoa, and Avocado Salad with Lemon Dijon Vinaigrette",
      description:
        "\nSteaming the kale removes some of the bitterness. The salad dressing ties all the flavors together. A quartet of super foods (kale, quinoa, avocado, and olive oil) make this a healthy meal!        ",
      image:
        "https://images.media-allrecipes.com/userphotos/560x315/4539934.jpg",
      tags: [
        "Side Dish",
        "Sauces and Condiments",
        "Salad Dressings",
        "Vinaigrette Dressing"
      ],
      ingredients: [
        "Salad",
        "2/3 cup quinoa",
        "1 1/3 cups water",
        "1 bunch kale, torn into bite-sized pieces",
        "1/2 avocado - peeled, pitted, and diced",
        "1/2 cup chopped cucumber",
        "1/3 cup chopped red bell pepper",
        "2 tablespoons chopped red onion",
        "1 tablespoon crumbled feta cheese",
        "Dressing",
        "1/4 cup olive oil",
        "2 tablespoons lemon juice",
        "1 1/2 tablespoons Dijon mustard",
        "3/4 teaspoon sea salt",
        "1/4 teaspoon ground black pepper"
      ],
      steps: [
        "Bring the quinoa and 1 1/3 cup water to a boil in a saucepan. Reduce heat to medium-low, cover, and simmer until the quinoa is tender, and the water has been absorbed, about 15 to 20 minutes. Set aside to cool.",
        "Place kale in a steamer basket over 1 inch of boiling water in a saucepan. Cover saucepan with a lid and steam kale until hot, about 45 seconds; transfer to a large plate. Top kale with quinoa, avocado, cucumber, bell pepper, red onion, and feta cheese.",
        "Whisk olive oil, lemon juice, Dijon mustard, sea salt, and black pepper together in a bowl until the oil emulsifies into the dressing; pour over the salad.",
        ""
      ],
      chef: "Le Chadam",
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
            <div className="description">"{this.recipe.description}"</div>
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
