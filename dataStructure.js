let auth = {
  username: "",
  hash: ""
};
let sessions = {
  username: "",
  sid: ""
};

let users = {
  username: "",
  uid: "",
  recipes: [], // user's posted recipes
  saved: [] // user's saved recipes
};

let recipes = {
  chef: "", // chef
  rid: "", // recipe id
  date: "",
  title: "", //the following is user submitted
  image: "",
  description: "",
  ingredients: [],
  steps: [],
  tags: []
};

let ingredients = {
  name: "",
  img: "url",
  category: "" // vegetable, fruit, meat, seafood, grain, spice, dairy
};

// let vegetables = {
//   name: "",
//   img: "url",
// }
// let meat = {
//   name: "",
//   img: "url",
// }
// let seafood = {
//   name: "",
//   img: "url",
// }
// let grains = {
//   name: "",
//   img: "url",
// }
// let spices = {
//   name: "",
//   img: "url",
// }
// let dairy = {
//   name: "",
//   img: "url",
// }

let ratings = {
  rid: "",
  rating: 5 / 5
};
