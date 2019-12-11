import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { img: "/nophoto.png", search: "" };
  }

  clickHandler = () => {
    fetch("https://api.scryfall.com/cards/search?q=" + this.state.search)
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        console.log(parsed);
        let img = parsed.data[0].image_uris.small;
        this.setState({ img });
      });
  };
  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.search}
          onChange={ev => {
            this.setState({ search: ev.target.value });
          }}
        />
        <button onClick={this.clickHandler}>search</button>
        <img src={this.state.img} />
      </>
    );
  }
}

export default Search;
