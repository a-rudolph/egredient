import React, { Component } from "react";
import styled from "styled-components";
import RecipePreview from "./RecipePreview.jsx";

const Div = styled.div`
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: flex-start;
`;

class Results extends Component {
  constructor(props) {
    super(props);
  }
  renderSearchResults = () => {
    if (this.props.recipes.length === 0) return <h3>No recipes found...</h3>;
    return (
      <>
        {this.props.recipes.map(recipe => {
          return <RecipePreview key={recipe.rid} recipe={recipe} />;
        })}
      </>
    );
  };

  render() {
    return <Div>{this.renderSearchResults()}</Div>;
  }
}

// let mapStateToProps = st => {
//   return {
//     favourites: st.userFavs
//   };
// };

// let Results = connect(mapStateToProps)(UnconnectedResults);

export default Results;
