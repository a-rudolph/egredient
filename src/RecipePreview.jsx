import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Tile = styled.div`
  position: relative;
  height: 50vh;
  width: 250px;
  margin: 25px;
  background-color: #dee9ed;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
  .image {
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
  h3 {
    margin: 0;
    padding: 5px;
  }
  #content {
    height: 15vh;
  }
  .arrow {
    width: 100%;
    display: flex;
    justify-content: center;
    opacity: 0.3;
    transition: opacity 0.2s ease;
    font-size: 20px;
    &:hover {
      opacity: 0.8;
    }
  }
  .ingredients {
    padding-bottom: 5px;
    position: absolute;
    bottom: ${props => props.ingredients};
    height: 50vh;
    display: grid;
    grid-template-rows: auto auto 1fr;
    background-color: #dee9ed;
    transition: bottom 0.3s ease;
    h3 {
      border-bottom: 1px solid;
    }
    ul {
      margin: 0;
      overflow: scroll;
      ::-webkit-scrollbar {
        width: 5px;
        height: 0px;
      }
      ::-webkit-scrollbar-track {
        background-color: #dee9ed;
      }

      ::-webkit-scrollbar-thumb {
        background-color: transparent;
        transition: background-color 0.3s ease;
        border-radius: 10px;
      }
      &:hover {
        ::-webkit-scrollbar-thumb {
          background-color: #696969a1;
        }
      }
    }
  }
`;

class RecipePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingr: false
    };
  }

  clickHandler = () => {
    this.setState({ ingr: !this.state.ingr });
  };

  render() {
    return (
      <Tile ingredients={this.state.ingr ? "0" : "-50vh"}>
        <Link className="image" to={"/recipe/" + this.props.recipe.rid}>
          <img src={this.props.recipe.image}></img>
          <h3>{this.props.recipe.title}</h3>
        </Link>
        <div id="content"></div>
        <div className="arrow up" onClick={this.clickHandler}>
          <FaCaretUp />
        </div>
        <div className="ingredients">
          <div className="arrow" onClick={this.clickHandler}>
            <FaCaretDown />
          </div>
          <h3>ingredients</h3>
          <ul>
            {this.props.recipe.ingredients.map((ing, i) => {
              return <li key={i}>{ing}</li>;
            })}
          </ul>
        </div>
      </Tile>
    );
  }
}

export default RecipePreview;
