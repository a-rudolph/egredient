import { createStore } from "redux";
import { LOGIN, MODAL, LOGOUT, QUERY, RECIPES, FAV } from "./globals.js";

const INITIAL_STATE = {
  activeUser: "guest",
  loggedIn: false,
  userFavs: {},
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
      return { ...state, activeUser: "guest", loggedIn: false, userFavs: {} };
    }
    case QUERY: {
      return { ...state, searchQuery: action.query };
    }
    case RECIPES: {
      return { ...state, recipes: action.recipes };
    }
    case FAV: {
      return { ...state, userFavs: action.favs };
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
