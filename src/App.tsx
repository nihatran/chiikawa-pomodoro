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

  // timer countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // change to break time
  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === "work") {
        const nextCount = pomodoroCount + 1;
        setPomodoroCount(nextCount);

        if (nextCount >= 4) {
          setMode("long");
          setTimeLeft(longBreak);
          setPomodoroCount(0);
          playLongSound();
        } else {
          setMode("short");
          setTimeLeft(shortBreak);
          playShortSound();
        }
      } else {
        setMode("work");
        setTimeLeft(pomodoroTime);
        playWorkSound();
      }
    }
  }, [timeLeft]);

  // ask for notification permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setTimeLeft(pomodoroTime);
    setIsRunning(false);
  };

  const playWorkSound = () => {
    if (Notification.permission === "granted") {
      const audio = new Audio("chiikawasounds.mp3");
      audio.play();
    }
  };

  const playShortSound = () => {
    if (Notification.permission === "granted") {
      const audio = new Audio("usagisounds.mp3");
      audio.play();
    }
  };

  const playLongSound = () => {
    if (Notification.permission === "granted") {
      const audio = new Audio("hitorigotsu.mp3");
      audio.play();
    }
  };

  return (
    <>
      <div className="pomodoroContainer">
        <Options
          setPomodoroTime={setPomodoroTime}
          setShortBreak={setShortBreak}
          setLongBreak={setLongBreak}
          setTimeLeft={setTimeLeft}
        ></Options>
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
