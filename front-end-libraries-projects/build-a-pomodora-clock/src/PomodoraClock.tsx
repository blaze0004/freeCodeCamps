import { RefObject, useEffect, useState } from "react";

const DEFAULT_BREAK_Length: number = 300;
const DEFAULT_SESSION_Length: number = 1500;
const NUMBER_OF_BREAK_ALLOWED: number = 4;

let timerInterval: NodeJS.Timeout;

export const usePomodoraClock = (audioRef: RefObject<HTMLAudioElement>): IPomodoraClock => {
  const [numberOfbreaksDone, setNumberOfBreaksDone] = useState(0);
  const [timer, setTimer] = useState(DEFAULT_SESSION_Length);
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK_Length);
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_Length);
  const [isLengthChanged, setIsLengthChanged] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (isPlayingAudio) {
      setTimeout(() => {
        if (audioRef.current) {
          console.log('first')
          audioRef.current.src = '';
          setIsPlayingAudio(false);
        }
      }, 2000)
    }
  }, [isPlayingAudio])

  useEffect(() => {
    if (isLengthChanged) {
      setTimer(sessionLength);
      setIsLengthChanged(false);
    }
  }, [isLengthChanged]);

  useEffect(() => {
    if (isBreakTime) {
      setIsPlaying(true);
    }
  }, [isBreakTime])

  const manageLength = (
    type: "session" | "break",
    isIncrement: boolean = false
  ) => {
    const add = isIncrement ? 60 : -60;
    if (type === "session") {
      if (sessionLength + add > 60 * 60 || sessionLength + add <= 0) {
        return;
      }
      setSessionLength((prev) => prev + add);
      setIsLengthChanged(true);
    } else {
      if (breakLength + add > 60 * 60 || breakLength + add <= 0) {
        return;
      }
      setBreakLength((prev) => prev + add);
      setIsLengthChanged(true);
    }
  };

  useEffect(() => {
    if (timer <= 0) {
      if (isBreakTime) {
        setTimer(sessionLength);
        setIsPlaying(true);
        setIsBreakTime(false);
      } else {
        setTimer(breakLength);
        setIsBreakTime(true);
      }
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.src = './assets/beep.wav';
        audioRef.current.play().then(() => {
          setIsPlayingAudio(true);
        }).catch(() => {
          if (audioRef.current && !isPlayingAudio) {
            console.log('second')
            audioRef.current.src = '';
          }
        });
      }
    }
  }, [timer]);

  useEffect(() => {
    if (isPlaying) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isPlaying]);

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const reset = () => {
    setNumberOfBreaksDone(0);
    setTimer(DEFAULT_SESSION_Length);
    setBreakLength(DEFAULT_BREAK_Length);
    setSessionLength(DEFAULT_SESSION_Length);
    setIsLengthChanged(false);
    setIsPlaying(false);
    setIsBreakTime(false);
    
    if (audioRef.current) {
      console.log('third')
      audioRef.current.src = '';
    }
  };

  return {
    breakLength,
    sessionLength,
    timer,
    isBreakTime,
    playPause,
    reset,
    manageLength,
  };
};

export interface IPomodoraClock {
  breakLength: number;
  sessionLength: number;
  timer: number;
  isBreakTime: boolean;
  playPause: () => void;
  reset: () => void;
  manageLength: (type: "session" | "break", isIncrement?: boolean) => void;
}
