import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  /* Deactivate StrictMode do to error with Dialog (Popup Window) from material ui --> findDOMNode is deprecated in StrictMode */
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);
