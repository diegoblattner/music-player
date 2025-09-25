import type { Track } from "../types";


type ControlsProps = Readonly<{
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlaying: () => void;
  onNext: () => void;
  onPrev: () => void;
  isShuffled: boolean;
  toggleShuffled: () => void;
}>;

export function Controls({
  currentTrack,
  isPlaying,
  togglePlaying,
  onNext,
  onPrev,
}: ControlsProps) {
  return (
    <div>
      {currentTrack && (
        <div className="p-2 bg-gray-950 border-t border-gray-100/70 backdrop-sepia-50">
          <div>{currentTrack.name}</div>
          <div>{currentTrack.artist}</div>
        </div>
      )}
      <div className="flex border-t border-gray-100/70 justify-center items-center p-2 gap-2">
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
