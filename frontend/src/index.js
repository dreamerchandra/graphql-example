// @flow
// import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import React from 'react';
import './App.css';
import RelayEnvironment from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay';
import GraphqlProvider from "./GraphqlProvider";

const Root = () => (
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <GraphqlProvider />
    </RelayEnvironmentProvider>
  </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
