/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from "react";

function App() {
  const data = {
    name: {
      key: "tset",
    },
  };

  console.log(data?.name?.key);
  return <h2>Hello</h2>;
}

export default App;
