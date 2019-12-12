import React, { Component } from "react";
import styled from "styled-components";
import Results from "./Results.jsx";
import { connect } from "react-redux";

class UnconnectedFavourites extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }
  componentDidMount() {
    console.log("mounting favs, ", this.props.favs);
    let rids = Object.keys(this.props.favs);
    if (rids.length === 0) return;
    let data = new FormData();
    data.append("rids", JSON.stringify(rids));
    fetch("/get-favourites", {
      method: "POST",
      body: data
    })
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success === false) {
          console.log("error");
          return;
        }
        console.log(parsed);
        this.setState({ recipes: parsed.recipes });
      });
    return;
  }

  render() {
    return <Results className="container" recipes={this.state.recipes} />;
  }
}

let mapStateToProps = st => {
  return {
    favs: st.userFavs
  };
};

let Favourites = connect(mapStateToProps)(UnconnectedFavourites);

export default Favourites;
