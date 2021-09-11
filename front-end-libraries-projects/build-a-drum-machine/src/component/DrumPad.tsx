import React, { useCallback, useEffect } from 'react';
import './DrumPad.css';

const DrumPad: React.FC<{
    keyTrigger: string;
    id: string;
    url: string;
    volume: number;
    isPowerOn: boolean;
    onPlay: (keyTrigger: string) => void;
    onComplete: () => void;
}> = (props) => {
    const { id, keyTrigger, url, volume, isPowerOn, onComplete, onPlay } = props;

    const playSound = useCallback(async () => {
        if (isPowerOn) {
            onPlay(id.replace(/-/g, ' '));
            const audio = document.getElementById(keyTrigger) as HTMLAudioElement;
            await audio.play().catch((e) => audio.pause());
        }
    }, [isPowerOn, keyTrigger, onPlay, id]);

    useEffect(() => {
        const eventHandler = (ev: KeyboardEvent) => {
            if (ev.key === keyTrigger.toLowerCase() || ev.key === keyTrigger.toUpperCase()) {
                playSound();
            }
        };
        window.addEventListener('keypress', eventHandler);

        return () => {
            window.removeEventListener('keypress', eventHandler);
        };
    }, [keyTrigger, playSound]);

    useEffect(() => {
        const audio = document.getElementById(keyTrigger) as HTMLAudioElement;
        audio.volume = volume;
    }, [volume, keyTrigger]);

    return (
        <div id={id} className='drum-pad' onClick={playSound}>
            <audio className='clip' src={url} id={keyTrigger} onEnded={onComplete} />
            <span className='drum-pad-text'>{keyTrigger}</span>
        </div>
    );
};

export default DrumPad;
