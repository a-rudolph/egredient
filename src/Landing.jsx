import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Banner from "./Banner.jsx";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  position: relative;
  .middle {
    background-color: white;
    height: 150vh;
    z-index: 5;
  }
`;

class Landing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Container>
          <Banner />
          <div className="middle">some other content</div>
        </Container>
      </>
    );
  }
}

export default Landing;
