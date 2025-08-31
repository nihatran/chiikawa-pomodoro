import { useState } from "react";
import "./App.css";
import { Timer } from "./Timer";
import { Options } from "./Options";
import { Controls } from "./Controls";

function App() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState("pomodoro");
  const [pomodoroCount, setPomodoroCount] = useState(0);

  return (
    <>
      <div className="pomodoroContainer">
        <Options></Options>
        <h1>Chiikawa Pomodoro</h1>
        <div className="timerContainer">
          <Timer></Timer>
          <Controls></Controls>
        </div>
        <img className="studybuddy" src="littleguys.png"></img>
      </div>
    </>
  );
}

export default App;
