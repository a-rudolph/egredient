import React, { Component } from "react";
import { tags } from "./data.js";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 50px;
  padding: 20px;
  display: flex;
  background-image: none;
  background-color: whitesmoke;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  input,
  textarea {
    padding: 5px;
    background-color: whitesmoke;
    color: #0e2616;
    border: 1px solid;
    width: 90%;
  }
  .tags {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    div {
      border-bottom: 1px solid;
      font-size: 20px;
    }
  }
  textarea {
    resize: none;
  }

  #top {
    padding: 10px;
    display: grid;
    grid-template-columns: auto auto;
    div {
      width: 25vw;
      flex-direction: column;
    }
  }
  label.image {
    cursor: pointer;
    img {
      height: 250px;
      object-fit: scale-down;
    }
    #file {
      display: none;
    }
  }
`;
const Tag = styled.label`
  padding: 2px 10px;
  user-select: none;
  border-bottom: 1px solid;
  background-color: whitesmoke;
  border-right: ${props => {
    if (props.checked === "active") return "4px solid #02402e";
    return "4px solid whitesmoke";
  }};
  &:hover {
    ${props => {
      if (props.checked === "active") return "";
      return `
        border-right: 4px solid #02402e
        background-color: rgb(185, 185, 185);
        `;
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
  tagText: "",
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
    let ret = [];
    let sampleTags = tags.slice(0, 10);
    let customTags = this.state.tagText.split(/\n|\s/);
    ret.push(
      sampleTags.map(tag => {
        if (this.state.tags[tag] !== undefined) {
          return (
            <Tag key={tag} checked="active">
              <input
                type="checkbox"
                onChange={this.tagHandler}
                id={tag}
              ></input>
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
      })
    );
    customTags.forEach((tag, i) => {
      if (tag !== "") {
        ret.push(
          <Tag key={i} checked="active">
            {tag}
          </Tag>
        );
      }
    });
    return ret;
  };

  render = () => {
    console.log("rendering state, ", this.state);
    return (
      <Container className="">
        <div className="form">
          New Recipe
          <div id="top">
            <div>
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
            <div>
              <div>
                Title
                <input
                  id="title"
                  placeholder="name your dish"
                  autoComplete="off"
                  type="text"
                  onChange={this.changeHandler}
                  value={this.state.title}
                />
              </div>
              <div>
                Description
                <textarea
                  id="description"
                  placeholder="describe your dish"
                  rows="4"
                  autoComplete="off"
                  onChange={this.changeHandler}
                  value={this.state.description}
                />
                Add tags
                <textarea
                  id="tagText"
                  placeholder="write your own or choose from the list on the right"
                  rows="4"
                  autoComplete="off"
                  onChange={this.changeHandler}
                  value={this.state.tagText}
                />
              </div>
            </div>
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
          <div>
            <button onClick={this.submitHandler}>Submit</button>
          </div>
        </div>
        <div className="tags">
          <div>Tags</div>
          {this.renderTags()}
        </div>
      </Container>
    );
  };
}

export default RecipeForm;
