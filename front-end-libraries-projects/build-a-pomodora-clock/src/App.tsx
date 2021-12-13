import React, { useRef } from "react";
import "./App.css";
import { usePomodoraClock } from "./PomodoraClock";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pomodoraClock = usePomodoraClock(audioRef);

  const getTimerTime = () => {
    const minutes = Math.floor(pomodoraClock.timer / 60);
    const seconds = Math.floor(pomodoraClock.timer - minutes * 60);
    const time = (minutes < 10 ? '0' : '') + (minutes + (0.01 * seconds)).toFixed(2);
    return `${time.replace('.', ':')}`;
  }

  return (
    <div className="App" id="pomodora-clock">
      <div id="break">
        <div id="break-label">Break Length</div>
        <div id="break-length">{pomodoraClock.breakLength / 60}</div>
        <div id="buttons">
          <button id='break-decrement' onClick={() => pomodoraClock.manageLength('break')}>
            ⬇️
          </button>
          <button id='break-increment' onClick={() => pomodoraClock.manageLength('break', true)}>
            ⬆️
          </button>
        </div>
      </div>
      <div id="session">
        <div id="session-label">Session Length</div>
        <div id="session-length">{pomodoraClock.sessionLength / 60}</div>
        <div id="buttons">
          <button id='session-decrement' onClick={() => pomodoraClock.manageLength('session')}>
            ⬇️
          </button>
          <button id='session-increment' onClick={() => pomodoraClock.manageLength('session', true)}>
            ⬆️
          </button>
        </div>
      </div>
      <div id="timer">
        <div id="timer-label">{pomodoraClock.isBreakTime ? "Break" : "Session"}</div>
        <div id="time-left">{getTimerTime()}</div>
      </div>
      <div id="actions">
        <button id="start_stop" onClick={() => pomodoraClock.playPause()}>⏯️</button>
        <button id="reset" onClick={() => pomodoraClock.reset()}>🔃</button>
      </div>
      <audio id="beep" loop={true} ref={audioRef} />
    </div>
  );
}

export default App;
