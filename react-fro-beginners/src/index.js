import React from "react";
import ReactDOM from "react-dom/client";
import MovieApp from "./movie/routes/MovieHomejs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MovieApp />
  </React.StrictMode>
);
