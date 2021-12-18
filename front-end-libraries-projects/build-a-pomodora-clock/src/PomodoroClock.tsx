import { useEffect, useMemo, useState } from "react";
import { usePomodoroClock } from "./hooks/usePomodoroClock";
import "./Pomodoro.css";

const PomodoroClock: React.FC = ({}) => {
  const pomodoraClock = usePomodoroClock();

  const getTimerTime = () => {
    const minutes = Math.floor(pomodoraClock.timer / 60);
    const seconds = Math.floor(pomodoraClock.timer - minutes * 60);
    const time =
      (minutes < 10 ? "0" : "") + (minutes + 0.01 * seconds).toFixed(2);
    return `${time.replace(".", ":")}`;
  };

  const [startTime, setStartTime] = useState<number>(0);
  useEffect(() => {
    setStartTime(pomodoraClock.timer);
  }, [pomodoraClock.timer]);

  const timeString = useMemo(() => {
    let numbers = "";

    for (let i = pomodoraClock.timer + 3600; i >= 0; i--) {
      if (Number.isInteger(i / 60)) {
        numbers += "|";
      } else {
        numbers += Number.isInteger(i / 10) ? "." : "";
      }
    }

    return numbers;
  }, [pomodoraClock.timer, startTime]);

  return (
    <div className="pomodoro">
      <div className="timer">
        <div>
          <div id="timer-label" className="timer-label cursive">
            {pomodoraClock.mode === "break" ? "Break" : "Session"}
          </div>
          <span id="time-left" className="time-left cursive">
            {getTimerTime()}
          </span>
        </div>
      </div>
      <span className="time">{timeString}</span>
      <span className="seperator"></span>
      <span className="arrow">&#11165;</span>
      <span className="upper"></span>
      <span className="lower"></span>
      <div id="break" className="cursive">
        <div id="break-label">Break Length</div>
        <div className="buttons">
          <button
            id="break-decrement"
            onClick={() => pomodoraClock.manageLength("break")}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div id="break-length">{pomodoraClock.breakLength / 60}</div>
          <button
            id="break-increment"
            onClick={() => pomodoraClock.manageLength("break", true)}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div id="session" className="cursive">
        <div id="session-label">Session Length</div>
        <div className="buttons">
          <button
            id="session-decrement"
            onClick={() => pomodoraClock.manageLength("session")}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div id="session-length">{pomodoraClock.sessionLength / 60}</div>
          <button
            id="session-increment"
            onClick={() => pomodoraClock.manageLength("session", true)}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div id="timer">
        <div id="actions" className="buttons">
          <button id="start_stop" onClick={() => pomodoraClock.playPause()}>
            {pomodoraClock.timerState !== 'play' ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
          </button>
          <button id="reset" onClick={() => pomodoraClock.reset()}>
          <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroClock;
