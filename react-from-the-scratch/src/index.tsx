import React, { FC, StrictMode } from "react";
import ReactDOM from "react-dom/client";

const App = () => <div>My beautiful React App</div>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
