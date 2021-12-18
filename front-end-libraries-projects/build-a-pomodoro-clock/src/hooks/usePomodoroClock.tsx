import { useEffect, useRef, useState } from "react";
import useAudioPlayer from "./useAudioPlayer";
import useLength from "./useLength";
import useTimer, { TimerStateType } from "./useTimer";

const DEFAULT_BREAK_Length: number = 300;
const DEFAULT_SESSION_Length: number = 1500;

function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export const usePomodoroClock = (): IPomodoraClock => {
  const [mode, setMode] = useState<'session' | 'break'>('session');
  const prevMode = usePrevious(mode);
  const [breakLength, setBreakLength] = useLength(DEFAULT_BREAK_Length);
  const [timer, timerState, setTimer, setTimerState] = useTimer(DEFAULT_SESSION_Length);
  const [sessionLength, setSessionLength] = useLength(DEFAULT_SESSION_Length);
  const [setIsPlayingAudio] = useAudioPlayer();

  const manageLength = (
    selectedMode: TMode,
    isIncrement: boolean = false
  ) => {
    const action = isIncrement ? 'increment' : 'decrement';
    switch (selectedMode) {
      case 'break':
        setBreakLength(action);
        break;
      case 'session':
        setSessionLength(action)
    }
  };

  useEffect(() => {
    if (timerState === 'reset') {
      setTimer(sessionLength)
    }
  }, [sessionLength])

  useEffect(() => {
    if (prevMode !== mode) {
      if (timerState === 'reset') {
        return;
      }
      setIsPlayingAudio(true);
      setTimeout(() => {
        setTimerState({
          type: 'resetAndPlay',
          payload: mode === 'session' ? sessionLength : breakLength
        });
      }, 1000)
    }
  }, [mode])

  useEffect(() => {
    if (timer <= 0) {
      setMode(prev => prev === 'break' ? 'session' : 'break');
      setTimerState({ type: 'pause' });
    }
  }, [timer]);

  const playPause = () => {
    if (timerState === 'reset') {
      setTimer(sessionLength);
    }
    
    setTimerState({
      type: timerState !==  'play' ? 'play' : 'pause'
    })
  };

  const reset = () => {
    setTimerState({ type: 'reset' });
    setBreakLength('reset')
    setSessionLength('reset');
    setIsPlayingAudio(false);
    setMode('session');
  };

  return {
    breakLength,
    sessionLength,
    timer,
    mode,
    timerState,
    playPause,
    reset,
    manageLength,
  };
};

type TMode = 'session' | 'break';

export interface IPomodoraClock {
  breakLength: number;
  sessionLength: number;
  timer: number;
  mode: TMode;
  timerState: TimerStateType;
  playPause: () => void;
  reset: () => void;
  manageLength: (type: TMode, isIncrement?: boolean) => void;
}
