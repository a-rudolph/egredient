import React, { Component } from "react";

class Testing extends Component {
  constructor(props) {
    super(props);
    this.state = { stepsInput: "" };
  }
  changeHandler = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };
  submitHandler = ev => {
    ev.preventDefault();
    let steps = this.state.stepsInput.split("\n");
    console.log(steps);
  };
  render = () => {
    console.log("rendering state, ", this.state);
    return (
      <form onSubmit={this.submitHandler}>
        <textarea
          rows="4"
          cols="50"
          id="stepsInput"
          onChange={this.changeHandler}
          value={this.state.stepsInput}
        ></textarea>
        <input type="submit"></input>
      </form>
    );
  };
}

export default Testing;
