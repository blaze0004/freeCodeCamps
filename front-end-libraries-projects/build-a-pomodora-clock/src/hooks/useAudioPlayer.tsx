import { Dispatch, SetStateAction, useEffect, useState } from "react";

let interval: NodeJS.Timeout;
const useAudioPlayer = (): [Dispatch<SetStateAction<boolean>>] => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioEl = document.getElementById("beep") as HTMLAudioElement;
    if (!audioEl) {
      return;
    }

    if (isPlaying) {
      audioEl.loop = true;
      audioEl.src = "/assets/beep.wav";
      audioEl
        .play()
        .then(() => {
          interval = setTimeout(() => {
            setIsPlaying(false);
          }, 2000);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      audioEl.src = "";
      audioEl.loop = false;
    }

    return () => {
      !!interval && clearInterval(interval);
    };
  }, [isPlaying]);

  return [setIsPlaying];
};

export default useAudioPlayer;
