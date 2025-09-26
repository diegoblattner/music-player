import { TimeControl } from "./TimeControl";
import { FaPlay, FaPause, FaBackwardStep, FaForwardStep, FaShuffle } from "react-icons/fa6";
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

type BtnProps = Readonly<{
  title: string;
  sizeClassName?: string;
  children: React.ReactNode;
  onClick: () => void;
  pressed?: boolean;
}>;

const btnSize = "rounded w-9 h-9 text-lg xs:w-11 xs:h-11 xs:text-xl";

function Btn({ title, sizeClassName = btnSize, children, onClick, pressed }: BtnProps) {
  return (
    <button
      title={title}
      aria-pressed={pressed}
      onClick={onClick}
      className={`
flex justify-center items-center rounded border border-gray-50/5 p-2 
cursor-pointer backdrop-hue-rotate-30 
shadow shadow-black active:scale-105 aria-[pressed="true"]:text-secondary aria-[pressed="true"]:text-xl
focus-visible:outline-2 focus-visible:outline-secondary-shaded
${sizeClassName}
`}
    >
      {children}
    </button>
  )
}

export function Controls({
  currentTrack,
  isPlaying,
  togglePlaying,
  onNext,
  onPrev,
  audioRef,
  isShuffled,
  toggleShuffled,
}: ControlsProps) {
  return (
    <div className="backdrop-hue-rotate-15">
      {currentTrack && (
        <div className="slide-in">
          <div className="px-4 pt-2 pb-4 bg-gray-950/50 backdrop-hue-rotate-15">
            <div className="text-lg">{currentTrack.title}</div>
            <div className="text-sm">{currentTrack.artist}</div>
          </div>
          <TimeControl audioRef={audioRef} currentTrack={currentTrack} />
        </div>
      )}
      <div className="flex justify-center gap-10 p-4">
        <Btn
          title="Shuffle playlist order"
          pressed={isShuffled}
          onClick={toggleShuffled}
        >
          <FaShuffle />
        </Btn>
        <div className="flex justify-center items-center -m-2 gap-4">
          <Btn title="Previous track" onClick={onPrev}>
            <FaBackwardStep />
          </Btn>
          <Btn
            title={isPlaying ? "Pause" : "Play"}
            sizeClassName="rounded-full w-12 h-12 text-xl xs:w-15 xs:h-15 xs:text-3xl"
            onClick={togglePlaying}
          >
              {isPlaying ? <FaPause /> : <FaPlay className="ms-1" />}
          </Btn>
          <Btn title="Next track" onClick={onNext}>
            <FaForwardStep />
          </Btn>
        </div>
        <div className={btnSize}></div>
      </div>
    </div>
  )
}
