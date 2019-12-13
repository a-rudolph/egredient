import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FAV } from "./globals";

const Div = styled.div`
  background: transparent;
  width: auto;
  .heart {
    overflow: visible;
    stroke: red;
    stroke-width: 30px;
    height: 30px;
    width: 30px;
  }
  .outline {
    fill: transparent;
    &:hover {
      fill: #ff634744;
    }
  }
  .fill {
    fill: red;
  }
`;

class UnconnectedFavourite extends Component {
  constructor(props) {
    super(props);
  }
  favouriteHandler = ev => {
    ev.preventDefault();
    let rid = this.props.rid;
    console.log("fav handled.. ", rid);
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("rid", rid);
    fetch("/update-favourites", {
      method: "POST",
      body: data
    })
      .then(resp => {
        return resp.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        this.props.update(parsed);
      });
  };
  render() {
    let filled = "outline";
    if (this.props.favourites[this.props.rid] !== undefined) filled = "fill";
    return (
      <Div>
        <FaHeart
          className={"heart " + filled}
          title="add to favourites"
          onClick={this.favouriteHandler}
        />
      </Div>
    );
  }
}

let mapStateToProps = st => {
  return {
    favourites: st.userFavs,
    username: st.activeUser
  };
};

let mapDispatchToProps = dispatch => {
  return {
    update: favs => {
      dispatch({ type: FAV, favs });
    }
  };
};

let Favourite = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedFavourite);

export default Favourite;
