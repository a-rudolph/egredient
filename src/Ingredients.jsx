/**
 * using wiki api to get images for ingredients
 * https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=parmesan&redirects=1&piprop=thumbnail%7Cname%7Coriginal
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
    background-color: #dee9ed;
    display: grid;
    grid-template-columns: auto 1fr;
    .form-holder {
      padding: 50px 0 50px 50px;
      display: flex;
      align-items: center;
      form {
        div {
          width: 100%;
          button {
            width: inherit;
          }
        }
      }
    }
  }
  .criteria-holder {
    padding-left: 40px;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    .criteria {
      padding: 50px 0 0 10px;
      border-right: 1px solid;
    }
    h3 {
      margin: 0;
    }
    .tile-holder {
      height: 200px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      overflow: scroll;
    }
    .tile {
      border-radius: 20px;
      margin: 5px;
      background: whitesmoke;
      height: 125px;
      width: 200px;
      display: flex;
      flex-direction: column;
      font-size: large;
      overflow: hidden;
      .img {
        height: 100%;
        width: 100%;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .name {
        display: grid;
        grid-template-columns: 1fr auto;
        padding: 0 10px;
      }
      .close {
        cursor: pointer;
        margin-left: 5px;
        color: red;
        opacity: 0.5;
        font-weight: bold;
        &:hover {
          opacity: 1;
        }
      }
    }
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
    let ingredient = this.state.input;
    let select = this.state.select;
    let temp = { ...this.state[select] };
    let q = ingredient.split(" ").join("%20");
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${ingredient}&redirects=1&piprop=thumbnail%7Cname%7Coriginal&origin=*`
    )
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        console.log(parsed);
        let pages = parsed.query.pages;
        let pageNum = Object.keys(parsed.query.pages)[0];
        let img = pages[pageNum].original.source;
        console.log(img);
        temp[this.state.input] = img;
        this.setState({ [select]: temp, input: "" });
      });
  };
  deleteHandler = ev => {
    console.log("delete handled");
    let select = ev.target.parentNode.id;
    // console.log("select, ", select);
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
  renderQueries = select => {
    let obj = this.state[select];
    let arr = Object.keys(obj);
    return (
      <div className="tile-holder scrollable">
        {arr.map((ing, i) => {
          return (
            <div className="tile" key={i} id={select}>
              <div className="img">
                <img src={obj[ing]}></img>
              </div>
              <div className="name" id={select}>
                {ing}{" "}
                <div className="close" id={ing} onClick={this.deleteHandler}>
                  x
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    // console.log(this.state);
    return (
      <Search className="background">
        <div className="container">
          <div className="panel">
            <div className="form-holder">
              <form onSubmit={this.submitHandler}>
                <select id="select" onChange={this.changeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                  <option value="not">not</option>
                </select>
                <input
                  id="input"
                  type="text"
                  placeholder="ingredient"
                  required
                  value={this.state.input}
                  onChange={this.changeHandler}
                />
                <input type="submit" value="add" />
                <div>
                  <button onClick={this.searchHandler}>Search</button>
                </div>
              </form>
            </div>
            <div className="criteria-holder">
              <div className="criteria">
                <h3>includes all:</h3>
                {this.renderQueries("and")}
              </div>
              <div className="criteria">
                <h3>includes any:</h3>
                {this.renderQueries("or")}
              </div>
              <div className="criteria">
                <h3>not included:</h3>
                {this.renderQueries("not")}
              </div>
            </div>
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
