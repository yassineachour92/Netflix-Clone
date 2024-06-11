import React from "react";
import requests from "./requests.js";
import Row from "./Row/Row.tsx";

import "./App.css";
import Banner from "./Banner/Banner.tsx";

const generateRows = (requests) => {
  return Object.keys(requests).map((key) => {
    const title = key
      .replace("fetch", "")
      .replace(/([A-Z])/g, " $1")
      .trim();
    return (
      <Row
        key={key}
        title={title}
        fetchUrl={requests[key]}
        isLargeRow={title === "Netflix Originals"}
      />
    );
  });
};

function App() {
  return (
    <div className="App">
      <Banner />
      {generateRows(requests)}
    </div>
  );
}

export default App;
