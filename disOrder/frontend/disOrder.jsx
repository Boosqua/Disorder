import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root'
/* test */
import {
  login,
  logout,
  signup
} from "./util/session_api_util"
import { receiveCurrentUser } from './actions/session_actions'
import {fetchServers} from './util/server_api_util'


document.addEventListener("DOMContentLoaded", () => {
  let store;
  
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { currentUserId: window.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  
  // Test 
  window.fetchServers = fetchServers
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //Test End 

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
