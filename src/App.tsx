import { useState } from "react";
import "./App.css";
import { Timer } from "./Timer";
import { Options } from "./Options";

function App() {
  return (
    <>
      <Options></Options>
      <div className="container">
        <h1>Chiikawa Pomodoro</h1>
        <Timer></Timer>
        <img className="studybuddy" src="littleguys.png"></img>
      </div>
    </>
  );
}

export default App;
