import React, { useState } from "react";
import DrumPad from "./DrumPad";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

const banks = [bankOne, bankTwo];

const DrumMachine: React.FC = () => {
  const [selectedBankIndex, setSelectedBankIndex] = useState(0);
  const [volume, setVolume] = useState<number>(1);
  const [selectedKeyTrigger, setSelectedKeyTrigger] = useState<string | null>(
    null
  );
  const [isPowerOn, setIsPowerOn] = useState<number>(1);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    setVolume(value / 100);
  };

  const handlePowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    setIsPowerOn(value);
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    setSelectedBankIndex(value);
  }

  const handleOnPlay = (keyTrigger: string) => {
    setSelectedKeyTrigger(keyTrigger);
  };

  const handleOnPlayComplete = () => {
    setSelectedKeyTrigger(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 5,
        backgroundColor: "lightgray",
        borderRadius: 8,
        border: "0.3rem solid orange",
        width: "40vw",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        Drums Machine
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {banks[selectedBankIndex]
            .map((x) => ({ ...x, volume, isPowerOn }))
            .map((x) => (
              <DrumPad
                {...x}
                key={x.id}
                onPlay={handleOnPlay}
                onComplete={handleOnPlayComplete}
              />
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <div>
            <label htmlFor="power">Power</label>
            <input
              type="radio"
              name="power"
              value={0}
              checked={isPowerOn === 0}
              onChange={handlePowerChange}
            />
            <input
              type="radio"
              name="power"
              value={1}
              checked={isPowerOn === 1}
              onChange={handlePowerChange}
            />
          </div>
          <div>{selectedKeyTrigger ?? "Smooth Piano Kit"}</div>
          <div>
            <label htmlFor="volume">Volume</label>
            <input
              type="range"
              min={0}
              max={100}
              name="volume"
              value={volume * 100}
              onChange={handleVolumeChange}
            />
          </div>
          <div>
            <label htmlFor="bank">Bank</label>
            <input
              type="radio"
              name="bank"
              value={0}
              checked={selectedBankIndex === 0}
              onChange={handleBankChange}
            />
            <input
              type="radio"
              name="bank"
              value={1}
              checked={selectedBankIndex === 1}
              onChange={handleBankChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
