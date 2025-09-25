import { useEffect, useState, type RefObject } from "react";
import type { Track } from "../types";

type TimeControl = Readonly<{
  currentTrack: Track;
  audioRef: RefObject<HTMLAudioElement | null>;
}>;

function secondsToTimeStr(timeInSeconds: number = 0): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toFixed(0).padStart(2, "0")}`;
}

const TIME_STEP = 0.25;

export function TimeControl({ currentTrack, audioRef }: TimeControl) {
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [durationStr, setDurationStr] = useState(secondsToTimeStr(0));
  const [timeStr, setTimeStr] = useState(secondsToTimeStr(0));

  useEffect(() => {
    if (audioRef.current) {
      const audioEl = audioRef.current;
      audioEl.ondurationchange = () => {
        setDuration(audioEl.duration ?? 0);
        setDurationStr(secondsToTimeStr(audioEl.duration));
      };
      return () => {
        if (audioEl) {
          audioEl.ondurationchange = null;
        }
      }
    }
  }, [audioRef]);

  useEffect(() => {
    if (currentTrack) {
      setTime(0);
      setTimeStr(secondsToTimeStr(0));
      const interval = setInterval(() => {
        setTime(audioRef.current?.currentTime ?? 0);
        setTimeStr(secondsToTimeStr(audioRef.current?.currentTime));
      }, TIME_STEP * 1000);

      return () => clearInterval(interval);
    }
  }, [audioRef, currentTrack]);

  const onSeekAudio = (goTo: number) => {
    if (!audioRef.current) return;

    if (goTo < 0) {
      audioRef.current.currentTime = 0;
    } else if (goTo > duration) {
      audioRef.current.currentTime = duration - 1;
    } else {
      audioRef.current.currentTime = goTo;
    }

    setTime(audioRef.current.currentTime);
    setTimeStr(secondsToTimeStr(audioRef.current.currentTime));
  };

  return (
    <div className="flex flex-col">
      <input
        className="time-control block w-full"
        type="range"
        value={time}
        min={0}
        max={duration}
        step={TIME_STEP}
        onChange={(ev) => onSeekAudio(Number(ev.target.value))}
      />
      <div className="flex justify-between text-xs">
        <div className="px-2 py-1">{timeStr}</div>
        <div className="px-2 py-1">{durationStr}</div>
      </div>
    </div>
  );
}
