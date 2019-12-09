import { createStore } from "redux";
import { LOGIN, MODAL, LOGOUT, QUERY, RECIPES } from "./globals.js";

const INITIAL_STATE = {
  activeUser: "guest",
  loggedIn: false,
  modal: "none",
  searchQuery: "",
  recipes: []
};

let reducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, loggedIn: true, activeUser: action.username };
    }
    case MODAL: {
      return { ...state, modal: action.display };
    }
    case LOGOUT: {
      return { ...INITIAL_STATE };
    }
    case QUERY: {
      return { ...state, searchQuery: action.query };
    }
    case RECIPES: {
      return { ...state, recipes: action.recipes };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(
  reducer,
  { ...INITIAL_STATE },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
