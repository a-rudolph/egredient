import React, { Component } from "react";
import { tags } from "./data.js";
import styled from "styled-components";

const Form = styled.div`
  background-color: #455931;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
  width: 70vw;
  padding: 20px;
  color: #bf4904;
  input,
  textarea {
    padding: 5px;
    background-color: #02402e;
    color: whitesmoke;
    border: 1px solid;
  }
  .tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  textarea {
    resize: none;
  }
  #top {
    display: flex;
    div {
      flex-direction: column;
    }
  }
  label.image {
    cursor: pointer;
    height: 300px;
    img {
      object-fit: scale-down;
      height: 100%;
    }
    #file {
      display: none;
    }
  }
`;
const Tag = styled.label`
  border-radius: 30px;
  padding: 2px 10px;
  margin: 5px;
  user-select: none;
  background-color: ${props => {
    if (props.checked === "active") return "#02402e";
    return "#b7ffb1";
  }};
  color: ${props => {
    if (props.checked === "active") return "#b7ffb1";
    return "#02402e";
  }};
  &:hover {
    background-color: ${props => {
      if (props.checked === "active") return "#02402e";
      return "#72ba6b";
    }};
  }
  input {
    display: none;
  }
`;

//sending: "title", "description", [ingredients], [steps], [tags]
const INITIAL_STATE = {
  title: "",
  image: "./nophoto.png",
  description: "",
  ingredients: "",
  steps: "",
  tags: {},
  imgMsg: "upload an image"
};
class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  changeHandler = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };
  tagHandler = ev => {
    let newState = { ...this.state };
    if (ev.target.checked) {
      newState.tags[ev.target.id] = 1;
    } else {
      delete newState.tags[ev.target.id];
    }
    this.setState(newState);
  };
  submitHandler = ev => {
    ev.preventDefault();
    let steps = this.state.steps.split("\n");
    let ingredients = this.state.ingredients.split("\n");
    let tags = Object.keys(this.state.tags);
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("image", this.state.image);
    data.append("description", this.state.description);
    data.append("ingredients", JSON.stringify(ingredients));
    data.append("steps", JSON.stringify(steps));
    data.append("tags", JSON.stringify(tags));
    fetch("/new-recipe", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (!parsed.success) {
          console.log("upload failed");
          return;
        }
        console.log("upload success!");
        this.setState({ ...INITIAL_STATE });
      });
  };
  uploadFile = async ev => {
    console.log("uploading file");
    let files = ev.target.files;
    let data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "egredient");

    let res = await fetch(
      "https://api.cloudinary.com/v1_1/durha33c4/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    let file = await res.json();
    console.log(file);
    if (file.error) {
      this.setState({ imgMsg: file.error.message.split(".").shift() });
      return;
    }
    this.setState({
      image: file.secure_url
    });
  };
  renderTags = () => {
    return tags.map(tag => {
      if (this.state.tags[tag] !== undefined) {
        return (
          <Tag key={tag} checked="active">
            <input type="checkbox" onChange={this.tagHandler} id={tag}></input>
            {tag}
          </Tag>
        );
      }
      return (
        <Tag key={tag}>
          <input type="checkbox" onChange={this.tagHandler} id={tag}></input>
          {tag}
        </Tag>
      );
    });
  };
  render = () => {
    console.log("rendering state, ", this.state);
    return (
      <Form>
        <div id="top">
          <div>
            <input
              id="title"
              placeholder="title"
              autoComplete="off"
              type="text"
              onChange={this.changeHandler}
              value={this.state.title}
            />
            <input
              id="description"
              placeholder="description"
              type="text"
              autoComplete="off"
              onChange={this.changeHandler}
              value={this.state.description}
            />
          </div>
          <label className="image">
            <img src={this.state.image} alt="Preview" />
            <div>{this.state.imgMsg}</div>
            <div>
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an Image"
                required
                onChange={this.uploadFile}
              ></input>
            </div>
          </label>
        </div>
        <textarea
          id="ingredients"
          rows="4"
          cols="50"
          placeholder="write each ingredient on a new line"
          onChange={this.changeHandler}
          value={this.state.ingredients}
        />
        <textarea
          id="steps"
          rows="4"
          cols="50"
          placeholder="write each step on a new line"
          onChange={this.changeHandler}
          value={this.state.steps}
        />
        <div className="tags">{this.renderTags()}</div>
        <button onClick={this.submitHandler}>Submit</button>
      </Form>
    );
  };
}

export default RecipeForm;
