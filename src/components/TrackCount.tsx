import type { Track } from "../types";

type TrackCountProps = Readonly<{
  playlistOrder: Track[];
}>;

export function TrackCount({ playlistOrder }: TrackCountProps) {
  return (
    <div className="flex justify-between px-4">
      <h2 className="text-lg">
        {playlistOrder.length} tracks
      </h2>
       {/* <span className="text-sm">{secondsToTimeStr(playlistOrder.reduce((sum, track) => (track.duration + sum), 0), "min ", "sec")}</span> */}
    </div>
  );
}
