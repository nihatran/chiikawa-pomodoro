import { useState, useEffect } from "react";
import "./Timer.css";

export function Timer() {
  return (
    <>
      <div className="timerContainer">
        <div className="timer">25:00</div>
        <div className="buttonsContainer">
          <button>Start</button>
          <button>Reset</button>
        </div>
      </div>
    </>
  );
}
