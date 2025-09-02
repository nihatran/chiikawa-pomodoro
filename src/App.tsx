import { useState, useEffect, useRef } from "react";
import "./App.css";
import { TimerDisplay } from "./TimerDisplay";
import { Options } from "./Options";
import { Controls } from "./Controls";

function App() {
  const [pomodoroTime, setPomodoroTime] = useState(1500);
  const [shortBreak, setShortBreak] = useState(300);
  const [longBreak, setLongBreak] = useState(900);
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === "work") {
        const nextCount = pomodoroCount + 1;
        setPomodoroCount(nextCount);

        if (nextCount >= 4) {
          setMode("long");
          setTimeLeft(longBreak);
          setPomodoroCount(0);
        } else {
          setMode("short");
          setTimeLeft(shortBreak);
        }
      } else {
        setMode("work");
        setTimeLeft(pomodoroTime);
      }
    }
  }, [timeLeft]);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setTimeLeft(pomodoroTime);
    setIsRunning(false);
  };

  return (
    <>
      <div className="pomodoroContainer">
        <Options></Options>
        <h1>Chiikawa Pomodoro</h1>
        <div className="timerContainer">
          {mode === "work"
            ? "Focus!"
            : mode === "short"
            ? "Short Break"
            : mode === "long"
            ? "Long Break"
            : ""}
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
