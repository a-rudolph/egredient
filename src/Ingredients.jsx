/**
 * using wiki api to get images for ingredients
 * /w/api.php?action=query&format=json&prop=pageimages&titles=parmesan&redirects=1&piprop=thumbnail%7Cname%7Coriginal
 */

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Results from "./Results.jsx";

const Search = styled.div`
  display: block;
  .container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .panel {
    padding: 50px;
  }
  .blue {
    background-color: #dee9ed;
  }
`;

class UnconnectedIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      select: "and",
      and: {},
      or: {},
      not: {},
      recipes: []
    };
  }
  changeHandler = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };
  submitHandler = ev => {
    ev.preventDefault();
    let select = this.state.select;
    let temp = { ...this.state[select] };
    temp[this.state.input] = 1;
    this.setState({ [select]: temp, input: "" });
  };
  deleteHandler = ev => {
    console.log("delete handled");
    let select = ev.target.parentNode.id;
    let temp = { ...this.state[select] };
    delete temp[ev.target.id];
    this.setState({ [select]: temp });
  };

  searchHandler = () => {
    console.log("search handled");
    let data = new FormData();
    data.append("and", JSON.stringify(this.state.and));
    data.append("or", JSON.stringify(this.state.or));
    data.append("not", JSON.stringify(this.state.not));
    fetch("/search-ingredients", { method: "POST", body: data })
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success === false) {
          console.log("search failed");
          return;
        }
        let recipes = parsed;
        this.setState({ recipes });
      });
    return;
  };

  renderAnd = () => {
    let ands = Object.keys(this.state.and);
    return (
      <div className="criteria">
        <h3>includes all:</h3>
        {ands.map((ing, i) => {
          return (
            <div className="tile" key={i} id="and">
              {ing}{" "}
              <span className="close" id={ing} onClick={this.deleteHandler}>
                &times;
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  renderOr = () => {
    let ors = Object.keys(this.state.or);
    return (
      <div className="criteria">
        <h3>includes any:</h3>
        {ors.map((ing, i) => {
          return (
            <div className="tile" key={i} id="or">
              {ing}{" "}
              <span className="close" id={ing} onClick={this.deleteHandler}>
                &times;
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  renderNot = () => {
    let nots = Object.keys(this.state.not);
    return (
      <div className="criteria">
        <h3>does not include:</h3>
        {nots.map((ing, i) => {
          return (
            <div className="tile" key={i} id="not">
              {ing}{" "}
              <span className="close" id={ing} onClick={this.deleteHandler}>
                &times;
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  renderResults = () => {
    return <></>;
  };

  render() {
    // console.log(this.state);
    return (
      <Search className="background">
        <div className="container">
          <div className="search panel blue">
            <form onSubmit={this.submitHandler}>
              <input
                id="input"
                type="text"
                placeholder="ingredient"
                required
                value={this.state.input}
                onChange={this.changeHandler}
              />
              <select id="select" onChange={this.changeHandler}>
                <option value="and">and</option>
                <option value="or">or</option>
                <option value="not">not</option>
              </select>
              <input type="submit" value="add" />
            </form>
            <div className="tile-holder">
              {this.renderAnd()}
              {this.renderOr()}
              {this.renderNot()}
            </div>
            <button onClick={this.searchHandler}>Search</button>
          </div>
        </div>
        <Results recipes={this.state.recipes} />
      </Search>
    );
  }
}

let mapDispatchToProps = disp => {
  return {};
};

let Ingredients = connect(null, mapDispatchToProps)(UnconnectedIngredients);

export default Ingredients;
