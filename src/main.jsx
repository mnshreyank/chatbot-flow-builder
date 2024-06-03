import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ReactFlowProvider } from "reactflow";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactFlowProvider>
  </React.StrictMode>
);
