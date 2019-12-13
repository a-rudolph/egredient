import React, { Component } from "react";
import styled from "styled-components";
import RecipePreview from "./RecipePreview.jsx";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const Container = styled.div`
  .page {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: flex-start;
  }
  .controls {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      color: white;
      font-size: large;
      background: #bf4904;
      height: 50px;
      width: 50px;
      border: none;
      margin: 5px;
      cursor: pointer;
      svg {
        height: 30px;
        width: 30px;
      }
    }
    #disabled {
      color: gray;
      cursor: default;
    }
  }
`;

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }
  clickHandler = ev => {
    let page = this.state.page;
    let target = ev.target;
    console.log(target);
    while (target.id === "") {
      target = target.parentNode;
      console.log(target);
    }
    switch (target.id) {
      case "left": {
        page = page - 1;
        break;
      }
      case "right": {
        page = page + 1;
        break;
      }
      default: {
        page = parseInt(target.id);
      }
    }
    this.setState({ page });
  };

  renderControls = () => {
    let recipes = this.props.recipes;
    if (this.props.recipes.length === 0) return <></>;
    let numPages = Math.floor(recipes.length / 6);
    if (numPages === 0) {
      return [
        <button id="disabled" key="left" disabled>
          <FaCaretLeft />
        </button>,
        <button disabled id="disabled" key="1">
          1
        </button>,
        <button id="disabled" key="right" disabled>
          <FaCaretRight />
        </button>
      ];
    }
    let controls = [];
    if (this.state.page === 1) {
      controls.push(
        <button id="disabled" key="left" disabled>
          <FaCaretLeft />
        </button>
      );
    } else {
      controls.push(
        <button id="left" key="left" onClick={this.clickHandler}>
          <FaCaretLeft />
        </button>
      );
    }
    for (let i = 1; i <= numPages; i++) {
      let n = "" + i;
      if (i === this.state.page) {
        controls.push(
          <button disabled id="disabled" key={n}>
            {n}
          </button>
        );
      } else {
        controls.push(
          <button id={n} key={n} onClick={this.clickHandler}>
            {n}
          </button>
        );
      }
    }
    if (this.state.page === numPages) {
      controls.push(
        <button id="disabled" key="right" disabled>
          <FaCaretRight />
        </button>
      );
    } else {
      controls.push(
        <button id="right" key="right" onClick={this.clickHandler}>
          <FaCaretRight />
        </button>
      );
    }
    return controls;
  };
  renderSearchResults = () => {
    let recipes = this.props.recipes;
    if (recipes.length === 0) return <h3>No recipes found...</h3>;
    let shift = (this.state.page - 1) * 6;
    let displayedRecipes = recipes.slice(shift, shift + 6);
    return (
      <>
        {displayedRecipes.map(recipe => {
          return <RecipePreview key={recipe.rid} recipe={recipe} />;
        })}
      </>
    );
  };

  render() {
    return (
      <Container>
        <div className="page">{this.renderSearchResults()}</div>
        <div className="controls">{this.renderControls()}</div>
      </Container>
    );
  }
}

export default Results;
