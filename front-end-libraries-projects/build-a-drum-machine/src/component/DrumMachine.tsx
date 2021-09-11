import React, { useState } from 'react';
import DrumPad from './DrumPad';
import SwitchInput from './SwitchInput/SwitchInput';
import trackData from './../assets/master_data/tracks-data.json';
import './DrumMachine.css';

type Tracks = 'smoothPianoKit' | 'heaterKit';

const DrumMachine: React.FC = () => {
    const [currentTrackName, setCurrentTrackName] = useState<Tracks>('smoothPianoKit');
    const [volume, setVolume] = useState<number>(1);
    const [status, showStatus] = useState<string>('DrumMachine');
    const [isPowerOn, setIsPowerOn] = useState<boolean>(true);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value);
        setVolume(value / 100);
        showStatus(`Volume: ${value}`);
    };

    const handlePowerChange = (_: React.ChangeEvent<HTMLInputElement>) => {
        setIsPowerOn((prev) => !prev);
        showStatus(`Power: ${!isPowerOn ? 'On' : 'Off'}`);
    };

    const handleTrackChange = (_: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTrackName((prev) => (prev === 'heaterKit' ? 'smoothPianoKit' : 'heaterKit'));
        showStatus(`Track: ${currentTrackName === 'heaterKit' ? 'Smooth Piano Kit' : 'Heater Kit'}`);
    };

    const handleOnPlay = (keyTrigger: string) => {
        showStatus(keyTrigger);
    };

    const resetStatusMessage = () => {
        setTimeout(() => {
            showStatus('DrumMachine');
        }, 1000);
    };

    return (
        <div id='drum-machine' className='drum-machine-root'>
            <div className='drum-machine-header'>
                <div className='drum-machine-switches'>
                    <SwitchInput name='power' label='Power' checked={isPowerOn} onChange={handlePowerChange} />
                    <SwitchInput name='soundTrack' label='SoundTrack' checked={currentTrackName === 'smoothPianoKit'} onChange={handleTrackChange} />
                </div>
                <div className='drum-machine-volume'>
                    <label htmlFor='volume'>Volume</label>
                    <input type='range' min={0} max={100} name='volume' value={volume * 100} onChange={handleVolumeChange} />
                </div>
            </div>
            <div className='drum-machine-pads'>
                {trackData[currentTrackName]
                    .map((x) => ({ ...x, volume, isPowerOn }))
                    .map((x) => (
                        <DrumPad {...x} key={x.id} onPlay={handleOnPlay} onComplete={() => resetStatusMessage()} />
                    ))}
            </div>
            <div className='drum-machine-footer'>
                <span id='display' className='drum-machine-status'>
                    <strong>
                        {status}
                    </strong>
                </span>
                <span className='drum-machine-link'>
                    <a target='_blank' rel='noreferrer' href='https://github.com/blaze0004/freeCodeCamps'>
                        GitHub | @Blaze0004
                    </a>
                </span>
            </div>
        </div>
    );
};

export default DrumMachine;
