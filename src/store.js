import { createStore } from "redux";
import { LOGIN } from "./globals.js";

const INITIAL_STATE = {
  activeUser: "guest",
  loggedIn: false
};

let reducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, loggedIn: true, activeUser: action.username };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
