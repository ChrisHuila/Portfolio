import React from "react";
import { createRoot } from "react-dom/client";

function NavigationBar() {
  console.log('hola');
  return <h1 style={{color: 'white'}}>Hola desde React! </h1>
}

const domNode = document.getElementById("rootReact");
const root = createRoot(domNode);
root.render(<NavigationBar />);