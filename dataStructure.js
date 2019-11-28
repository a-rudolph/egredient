let auth = {
  username: "",
  hash: ""
};
let sessions = {
  uid: "",
  sid: ""
};

let users = {
  username: "",
  uid: "",
  recipes: [], // user's posted recipes
  saved: [] // user's saved recipes
};

let recipes = {
  rid: "", // recipe id
  uid: "", // chef id
  title: "",
  description: "",
  ingredients: [],
  steps: [],
  tags: []
};

let ingredients = {
  name: "",
  category: "",
  tags: [],
  img: "url"
};

let ratings = {
  rid: "",
  rating: 5 / 5
};
