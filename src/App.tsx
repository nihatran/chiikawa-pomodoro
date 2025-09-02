import { useState, useEffect, useRef } from "react";
import "./App.css";
import { TimerDisplay } from "./TimerDisplay";
import { Options } from "./Options";
import { Controls } from "./Controls";

function App() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setTimeLeft(1500);
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <div className="pomodoroContainer">
        <Options></Options>
        <h1>Chiikawa Pomodoro</h1>
        <div className="timerContainer">
          <TimerDisplay timeLeft={timeLeft}></TimerDisplay>
          <Controls
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            isRunning={isRunning}
          ></Controls>
        </div>
        <img className="studybuddy" src="littleguys.png"></img>
      </div>
    </>
  );
}

export default App;
