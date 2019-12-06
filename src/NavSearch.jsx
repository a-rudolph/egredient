import React, { Component } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Search = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 30px;
  label {
    display: flex;
    border: 1px solid;
    border-radius: 15px;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    opacity: ${props => props.opacity};
    transition: opacity 0.2s ease;
  }
  input {
    padding: 5px 0;
    width: 0;
    border: 0px;
    background: transparent;
    transition: all 0.3s ease;
    &:focus {
      width: calc(100vw - 510px);
    }
  }
  .svg {
    width: 26px;
    svg {
      margin-left: 5px;
    }
  }
`;

class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", open: false, opacity: "0.3" };
  }

  changeHandler = ev => {
    this.setState({ query: ev.target.value });
  };
  extend = () => {
    this.setState({ open: true });
  };
  submitHandler = ev => {
    ev.preventDefault();
  };
  render() {
    // console.log("rendering with state: ", this.state);
    return (
      <>
        <Search opacity={this.state.opacity}>
          <form onSubmit={this.submitHandler}>
            <label
              onClick={this.extend}
              onMouseEnter={() => this.setState({ opacity: "0.8" })}
              onMouseLeave={() => {
                if (this.state.open) return;
                this.setState({ opacity: "0.3" });
              }}
            >
              <div className="bar svg">
                <FaSearch />
              </div>
              <input
                className="bar extend"
                type="text"
                value={this.state.query}
                onChange={this.changeHandler}
              ></input>
            </label>
          </form>
        </Search>
      </>
    );
  }
}

export default NavSearch;
