import React from "react";
// import { createContext } from 'react';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import actionCable from 'actioncable'
import App from "./App";

// const CableApp = {}
// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
// export const ActionCableContext = React.createContext();
const Root = ({ store }) => {
   // debugger
   return (
  <Provider store={store}>
   {/* <ActionCableContext.provider value={CableApp.cable} > */}
      <HashRouter>
         <App />
      </HashRouter>
    {/* </ActionCableContext.provider> */}
  </Provider>
)};

export default Root