import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { QUERY } from "./globals.js";
import { tags } from "./DATA.js";
import RecipePreview from "./RecipePreview.jsx";

const Recipes = styled.div`
  .container {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .panel {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }
  #recent-tags {
    background-color: #dee9ed;
    justify-content: left;
    padding-bottom: 10px;
  }
  .search {
    background-color: #dee9ed;
    height: 10vh;
    padding-top: 10vh;
    div {
      font-size: x-large;
      input {
        font-size: inherit;
        background: transparent;
        border: none;
        border-bottom: 1px solid;
        opacity: 0.5;
        &:hover,
        &:focus {
          opacity: 0.9;
        }
      }
      button {
        font-size: inherit;
        height: 2rem;
        background: whitesmoke;
        opacity: 0.5;
        border-radius: 0 15px 15px 0;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .results {
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
  }

  .tags {
    float: left;
    padding: 0 0 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: large;
    width: 3em;
    height: calc(100vw - 17px);
    background-color: transparent;
    overflow-y: scroll;
    transform: rotate(-90deg) translateX(-100%);
    transform-origin: left top;
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
    .tag {
      user-select: none;
      width: 6em;
      font-size: large;
      padding: 0.5em;
      margin-top: 1em;
      background-color: #dee9ed;
      border-bottom: 1px solid;
      transform: rotate(45deg);
      transform-origin: bottom left;
      opacity: 0.5;
      transition: opacity 0.1s ease;
      &:hover {
        opacity: 0.8;
      }
    }
    .selected {
      opacity: 0.8;
      border-left: 1px solid;
    }
    .placeholder {
      border: none;
    }
  }
`;

class UnconnectedBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: {} };
    this.tagData = tags.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  }

  renderSearchResults = () => {
    return (
      <>
        <RecipePreview />
      </>
    );
  };

  renderTags = () => {
    let tags = this.tagData;
    let ret = [];
    tags.forEach((tag, i) => {
      if (this.state.tags[tag] !== undefined) {
        ret.push(
          <div
            className="tag selected"
            id={tag}
            key={i}
            onClick={this.tagHandler}
          >
            {tag}
          </div>
        );
      } else {
        ret.push(
          <div className="tag" id={tag} key={i} onClick={this.tagHandler}>
            {tag}
          </div>
        );
      }
    });
    return ret;
  };
  tagHandler = ev => {
    let tags = { ...this.state.tags };
    let tag = ev.target.id;
    if (tags[tag] !== undefined) {
      delete tags[tag];
    } else {
      tags[tag] = 1;
    }
    this.setState({ tags });
  };
  changeHandler = ev => {
    this.props.queryChange(ev.target.value);
  };

  submitHandler = ev => {
    ev.preventDefault();
    console.log("submit request");
  };

  render() {
    console.log("rendering with state, ", this.state);
    return (
      <Recipes className="background">
        <div className="container">
          <div className="search panel">
            <div className="panel">
              <form onSubmit={this.submitHandler}>
                <input
                  autoFocus
                  type="text"
                  placeholder="search for a recipe..."
                  value={this.props.query}
                  onChange={this.changeHandler}
                ></input>
              </form>
              <button type="submit" onClick={this.clickHandler}>
                search
              </button>
            </div>
          </div>
          <div className="panel" id="recent-tags">
            recent tags
          </div>
          <div className="tags panel">{this.renderTags()}</div>
          <div className="results panel">{this.renderSearchResults()}</div>
        </div>
      </Recipes>
    );
  }
}

let mapStateToProps = st => {
  return {
    query: st.searchQuery
  };
};

let mapDispatchToProps = dispatch => {
  return {
    queryChange: q => {
      dispatch({ type: QUERY, query: q });
    }
  };
};

let Browse = connect(mapStateToProps, mapDispatchToProps)(UnconnectedBrowse);

export default Browse;
