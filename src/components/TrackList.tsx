import { secondsToTimeStr } from "../utils";
import type { Track } from "../types";

type TrackListProps = Readonly<{
  tracks: Track[];
  currentTrack: Track | null;
  onClick: (track: Track) => void;
  isPlaying: boolean;
  playedTracks: Set<Track>;
}>;

export function TrackList({ currentTrack, tracks, onClick, isPlaying, playedTracks }: TrackListProps) {
  if (tracks.length === 0) {
    return <div className="text-center">Sorry, we are out of tracks 🫣</div>;
  }
  return (
    <div className="flex flex-col mb-4 divide-y divide-y-gray-100/10 bg-gray-800/30">
      {tracks.map((track) => (
        <button
          key={track.src}
          onClick={() => onClick(track)}
          className={`
flex py-2 px-2 text-start cursor-pointer border-gray-100/10 
border-x last:border-b last:rounded-b-lg backdrop-hue-rotate-15
aria-[pressed="true"]:text-primary aria-[pressed="true"]:font-semibold
aria-[pressed="true"]:backdrop-brightness-150 aria-[pressed="true"]:inset-shadow-stone-800
aria-[pressed="true"]:inset-shadow-sm
aria-[pressed="true"]:border-s-4
aria-[pressed="true"]:border-s-primary
outline-0 focus-visible:border-s-4 focus-visible:border-s-secondary 
${playedTracks.has(track) ? "text-white/70" : ""}
`}
          aria-pressed={currentTrack === track}
        >
          <div className="grow">
            <div>{track.title}</div>
            <div className="text-sm">{track.artist}</div>
          </div>
          <div className={`flex items-center w-12 h-12 ${currentTrack === track && isPlaying ? "slide-in" : ""}`}>
            <span className={`scale-[0.4] ${currentTrack === track && isPlaying ? "playing" : ""}`} />
          </div>
          <div className="flex items-center w-12 h-12 text-sm">
            <span>{secondsToTimeStr(track.duration)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
