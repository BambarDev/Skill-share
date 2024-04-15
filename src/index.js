import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./pages";
import Context from "./context/context";
import "react-toastify/dist/ReactToastify.css";
import "react-tagsinput/react-tagsinput.css";

// Select the root element
const rootElement = document.getElementById("root");

// Create a root
const root = createRoot(rootElement);

// Render your app component
root.render(
  <React.StrictMode>
    <Context>
      <MainPage />
    </Context>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
