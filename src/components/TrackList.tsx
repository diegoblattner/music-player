import type { Track } from "../types";

type TrackListProps = Readonly<{
  tracks: Track[];
  currentTrack: Track | null;
  onClick: (track: Track) => void;
  isPlaying: boolean;
  playedTracks: Set<Track>;
}>;

export function TrackList({ currentTrack, tracks, onClick, isPlaying }: TrackListProps) {
  if (tracks.length === 0) {
    return <div className="text-center">Sorry, we are out of tracks 🫣</div>;
  }
  return (
    <div className="flex flex-col mb-4 divide-y divide-y-gray-100/10 bg-gray-800/30">
      {tracks.map((track) => (
        <button
          key={track.src}
          onClick={() => onClick(track)}
          className={`flex py-2 px-2 text-start cursor-pointer border-gray-100/10 border-x last:border-b last:rounded-b-lg  ${currentTrack === track ? "text-primary font-semibold backdrop-brightness-150 inset-shadow-stone-800 inset-shadow-sm" : "backdrop-hue-rotate-15"}`}
          aria-pressed={currentTrack === track}
        >
          <div className="grow">
            <div className="text-lg">{track.title}</div>
            <div className="text-sm">{track.artist}</div>
          </div>
          <div className="flex items-center w-12 h-12">
            <span className={`scale-[0.4] ${currentTrack === track && isPlaying ? "playing" : ""}`} />
          </div>
        </button>
      ))}
    </div>
  );
}
