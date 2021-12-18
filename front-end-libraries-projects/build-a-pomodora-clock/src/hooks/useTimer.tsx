import { Dispatch, SetStateAction, useEffect, useState } from "react";

let interval: NodeJS.Timeout | null = null;

const useTimer = (defaultTime: number): [number, TimerStateType, Dispatch<SetStateAction<number>>, Dispatch<SetStateAction<TUseTimerAction>>] => {
    const [timer, setTimer] = useState(defaultTime);
    const [timerState, setTimerState] = useState<TUseTimerAction>({
        type: 'reset',
        payload: defaultTime
    });
    
    useEffect(() => {
        switch(timerState.type) {
            case 'play': {
                interval = setInterval(() => {
                    setTimer(prev => prev - 1);
                }, 1000);
                break;
            }
            case 'pause':
                interval !== null && clearInterval(interval);
                break;
            case 'reset':
                interval !== null && clearInterval(interval);
                setTimer(timerState.payload ?? defaultTime);
                break;
            case 'resetAndPlay':
                interval !== null && clearInterval(interval);
                setTimer(timerState.payload ?? defaultTime);
                setTimerState({ type: 'play' });
                break;
        }

        return () => {
            if (timerState.type === 'play') {
                interval && clearInterval(interval);
            }
        }
    }, [timerState, defaultTime])

    return [timer, timerState.type, setTimer, setTimerState]
}

export type TimerStateType = 'play' | 'pause' | 'reset' | 'resetAndPlay';

type TUseTimerAction = {
    type: TimerStateType;
    payload?: number;
};

export default useTimer;