// import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from 'react';
import './App.css';
// import fetchGraphQL from './fetchGraphQL';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

const Root = () => (
  <React.StrictMode>
    {/* <RelayEnvironmentProvider environment={RelayEnvironment}> */}
      <App />
    {/* </RelayEnvironmentProvider> */}
  </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
