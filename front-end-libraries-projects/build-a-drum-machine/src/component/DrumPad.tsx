import React, { useCallback, useEffect } from "react";

const DrumPad: React.FC<{
  keyTrigger: string;
  id: string;
  url: string;
  volume: number;
  isPowerOn: number;
  onPlay: (keyTrigger: string) => void;
  onComplete: () => void;
}> = (props) => {
  const { id, keyTrigger, url, volume, isPowerOn, onComplete, onPlay } = props;

  const playSound = useCallback(() => {
    if (isPowerOn) {
      const audio = document.getElementById(keyTrigger) as HTMLAudioElement;
      audio.play();
    }
  }, [isPowerOn, keyTrigger]);

  useEffect(() => {
    const eventHandler = (ev: KeyboardEvent) => {
      if (ev.key === keyTrigger.toLowerCase()) {
        playSound();
      }
    };
    window.addEventListener("keypress", eventHandler);

    return () => {
      window.removeEventListener("keypress", eventHandler);
    };
  }, [keyTrigger, playSound]);

  useEffect(() => {
    const audio = document.getElementById(keyTrigger) as HTMLAudioElement;
    audio.volume = volume;
  }, [volume, keyTrigger])


  return (
    <div id={id} style={{ flex: "1 0 33.3%" }}>
      <button onClick={playSound} style={{ width: "90%", height: "90%" }}>
        <audio src={url} id={keyTrigger} onPlay={() => onPlay(keyTrigger)} onEnded={onComplete} />
        {keyTrigger}
      </button>
    </div>
  );
};

export default DrumPad;
