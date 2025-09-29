import { useEffect, useState, type RefObject } from "react";
import { secondsToTimeStr } from "../utils";
import type { Track } from "../types";

type TimeControl = Readonly<{
  currentTrack: Track;
  mediaRef: RefObject<HTMLAudioElement | HTMLVideoElement | null>;
}>;

const TIME_STEP = 0.25;

export function TimeControl({ currentTrack, mediaRef }: TimeControl) {
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [durationStr, setDurationStr] = useState(secondsToTimeStr(0));
  const [timeStr, setTimeStr] = useState(secondsToTimeStr(0));

  useEffect(() => {
    if (mediaRef.current) {
      const audioEl = mediaRef.current;
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
  }, [mediaRef]);

  useEffect(() => {
    if (currentTrack) {
      setTime(0);
      setTimeStr(secondsToTimeStr(0));
      const interval = setInterval(() => {
        if (mediaRef.current?.paused) return;

        setTime(mediaRef.current?.currentTime ?? 0);
        setTimeStr(secondsToTimeStr(mediaRef.current?.currentTime));
      }, TIME_STEP * 1000);

      return () => clearInterval(interval);
    }
  }, [mediaRef, currentTrack]);

  const onSeekAudio = (goTo: number) => {
    if (!mediaRef.current) return;

    if (goTo < 0) {
      mediaRef.current.currentTime = 0;
    } else if (goTo > duration) {
      mediaRef.current.currentTime = duration - 1;
    } else {
      mediaRef.current.currentTime = goTo;
    }

    setTime(mediaRef.current.currentTime);
    setTimeStr(secondsToTimeStr(mediaRef.current.currentTime));
  };

  return (
    <div className="slide-in flex flex-col -mt-1.5 -mb-2">
      <input
        aria-label="Time control"
        className="time-control block w-full"
        type="range"
        value={time}
        min={0}
        max={duration}
        step={TIME_STEP}
        onChange={(ev) => onSeekAudio(Number(ev.target.value))}
      />
      <div className="flex justify-between text-xs mt-2">
        <div className="px-2">{timeStr}</div>
        <div className="px-2">{durationStr}</div>
      </div>
    </div>
  );
}
