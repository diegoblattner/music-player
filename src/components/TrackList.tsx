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
    <div className="flex flex-col border-y border-gray-100/70 md:border md:rounded-lg divide-y divide-gray-100/70 mb-4">
      {tracks.map((track) => (
        <button
          key={track.src}
          onClick={() => onClick(track)}
          className={`flex py-2 px-4 md:px-2 text-start ${currentTrack === track ? "text-primary font-semibold backdrop-sepia-50" : ""}`}
          aria-pressed={currentTrack === track}
        >
          <div className="grow">
            <div>{track.name}</div>
            <div>{track.artist}</div>
          </div>
          <div className="flex items-center w-12 h-12">
            <span className={`scale-[0.4] ${currentTrack === track && isPlaying ? "playing" : ""}`} />
          </div>
        </button>
      ))}
    </div>
  );
}
