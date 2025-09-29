import {
  FaPlay,
  FaPause,
  FaBackwardStep,
  FaForwardStep,
  FaShuffle,
  FaRepeat,
  FaInfinity,
} from "react-icons/fa6";
import type { Repeat } from "../types";

type ControlsProps = Readonly<{
  isPlaying: boolean;
  togglePlaying: () => void;
  onNext: () => void;
  onPrev: () => void;
  isShuffled: boolean;
  toggleShuffled: () => void;
  repeatType: Repeat;
  setRepeatType: (repeat: Repeat) => void;
}>;

type BtnProps = Readonly<{
  title: string;
  sizeClassName?: string;
  children: React.ReactNode;
  onClick: () => void;
  pressed?: boolean;
}>;

const btnSize = "rounded w-9 h-9 text-lg xs:w-11 xs:h-11 xs:text-xl";

const REPEAT_LABEL: Record<Repeat, string> = {
  "none": "No repeat",
  "one": "Repeat current",
  "all": "Repeat all",
}
const REPEAT_LOOP: Record<Repeat, Repeat> = {
  "none": "one",
  "one": "all",
  "all": "none",
}

function Btn({ title, sizeClassName = btnSize, children, onClick, pressed }: BtnProps) {
  return (
    <button
      title={title}
      aria-pressed={pressed}
      onClick={onClick}
      className={`
flex justify-center items-center rounded border border-gray-100/10 p-2 
cursor-pointer bg-gray-900/25
shadow shadow-black active:scale-105 aria-[pressed="true"]:text-secondary aria-[pressed="true"]:text-xl
focus-outline
${sizeClassName}
`}
    >
      {children}
    </button>
  )
}

export function Controls({
  isPlaying,
  togglePlaying,
  onNext,
  onPrev,
  isShuffled,
  toggleShuffled,
  repeatType,
  setRepeatType,
}: ControlsProps) {
  return (
    <div className="backdrop-hue-rotate-15">
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
        <Btn
          title={REPEAT_LABEL[repeatType]}
          pressed={repeatType !== "none"}
          onClick={() => setRepeatType(REPEAT_LOOP[repeatType])}
        >
          <div className="relative">
            <FaRepeat />
            <span className="absolute text-xs -bottom-2 -end-[5px] xs:-bottom-2.5 xs:-end-1.5">
              {repeatType === "one" && "1"}
              {repeatType === "all" && <FaInfinity />}
            </span>
          </div>
        </Btn>
      </div>
    </div>
  )
}
