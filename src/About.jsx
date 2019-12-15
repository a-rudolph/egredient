import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Ingredients from "./Ingredients.jsx";
import Banner from "./Banner.jsx";
import Footer from "./Footer.jsx";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  position: relative;
  .middle {
    background-color: white;
    height: 30vh;
    z-index: 5;
  }
`;

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Container>
          <Banner clickable={true} />
          <div className="middle"></div>
          <Footer />
        </Container>
      </>
    );
  }
}

export default About;
