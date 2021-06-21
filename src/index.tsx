import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// inicializa o firebase
import "./services/firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);