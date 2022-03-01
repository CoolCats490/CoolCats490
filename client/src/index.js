import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./Store/auth-context";

ReactDOM.render(
  <React.StrictMode>
  <AuthContextProvider>
    {/* BrowserRouter is used to route to different pages of the site */}
    <HashRouter>
      <App />
    </HashRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
