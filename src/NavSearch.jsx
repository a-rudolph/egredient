import React, { Component } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Search = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 30px;

  input {
    border-radius: 0 0 0 5px;
  }
  svg {
    opacity: 0.3;
  }
`;

class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  render() {
    return (
      <>
        <Search>
          <form onSubmit={this.submitHandler}>
            <label>
              <FaSearch />
              <input
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
