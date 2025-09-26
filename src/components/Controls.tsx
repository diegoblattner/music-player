import { TimeControl } from "./TimeControl";
import { type RefObject } from "react";
import type { Track } from "../types";


type ControlsProps = Readonly<{
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlaying: () => void;
  onNext: () => void;
  onPrev: () => void;
  isShuffled: boolean;
  toggleShuffled: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
}>;

export function Controls({
  currentTrack,
  isPlaying,
  togglePlaying,
  onNext,
  onPrev,
  audioRef,
}: ControlsProps) {
  return (
    <div>
      {currentTrack && (
        <div className="slide-in">
          <div className="px-4 pt-2 pb-4 bg-gray-950/50 backdrop-hue-rotate-15">
            <div className="text-lg">{currentTrack.title}</div>
            <div className="text-sm">{currentTrack.artist}</div>
          </div>
          <TimeControl audioRef={audioRef} currentTrack={currentTrack} />
        </div>
      )}
      <div className="flex justify-center items-center p-2 gap-2">
        <div>
          <button className="rounded border border-gray-100/70 p-2 cursor-pointer w-11 h-11" onClick={onPrev}>{"<"}</button>
        </div>
        <div>
          <button className="rounded-full border border-gray-100/70 cursor-pointer w-14 h-14" onClick={togglePlaying}>{isPlaying ? "||" : "|>"}</button>
        </div>
        <div>
          <button className="rounded border border-gray-100/70 p-2 cursor-pointer w-11 h-11" onClick={onNext}>{">"}</button>
        </div>
      </div>
    </div>
  )
}
