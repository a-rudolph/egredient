import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import Favourite from "./Favourite.jsx";

const Tile = styled.div`
  position: relative;
  height: 50vh;
  width: 350px;
  margin: 15px;
  background-color: #dee9ed;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
  .label {
    text-decoration: none;
    color: black;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    h3 {
      white-space: nowrap;
      height: 1em;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 320px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  h3 {
    margin: 0;
    padding: 5px;
  }
  #content {
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    .favourite {
      display: flex;
      padding: 5px 5px 0 5px;
      border-radius: 5px;
    }
  }
  .arrow {
    width: 100%;
    display: flex;
    justify-content: center;
    opacity: 0.3;
    transition: all 0.2s ease;
    font-size: 20px;
    &:hover {
      opacity: 0.8;
    }
  }
  .up {
    position: absolute;
    bottom: -25px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover {
      bottom: 0px;
    }
  }
  .title {
    text-align: center;
    width: 100%;
    opacity: 1;
    background-color: whitesmoke;
    border-bottom: 1px solid;
    font-size: 20px;
  }
  .ingredients {
    position: absolute;
    bottom: ${props => props.ingredients};
    height: 50vh;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr;
    background-color: whitesmoke;
    transition: bottom 0.3s ease;
    ul {
      margin: 0;
      padding-top: 3px;
      overflow: scroll;
      ::-webkit-scrollbar {
        width: 5px;
        height: 0px;
      }
      ::-webkit-scrollbar-track {
        background-color: whitesmoke;
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

class UnconnectedRecipePreview extends Component {
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
        <Link className="label" to={"/recipe/" + this.props.recipe.rid}>
          <img src={this.props.recipe.image}></img>
          <h3 title={this.props.recipe.title}>{this.props.recipe.title}</h3>
        </Link>
        <div id="content">
          {this.props.isLoggedIn && (
            <div className="favourite">
              <Favourite rid={this.props.recipe.rid} />
            </div>
          )}
        </div>
        <div className="arrow up" onClick={this.clickHandler}>
          <FaCaretUp />
          <div className="title">ingredients</div>
        </div>
        <div className="ingredients">
          <div className="arrow" onClick={this.clickHandler}>
            <FaCaretDown />
          </div>
          <div className="title">ingredients</div>
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

let mapStateToProps = st => {
  return {
    isLoggedIn: st.loggedIn
  };
};

let RecipePreview = connect(mapStateToProps)(UnconnectedRecipePreview);

export default RecipePreview;
