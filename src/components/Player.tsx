import { useState, type RefObject } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { TimeControl } from "./TimeControl";
import { SlideVertical } from "./SlideVertical";
import type { Track } from "../types";

type PlayerProps = Readonly<{
  currentTrack: Track | null;
  mediaRef: RefObject<HTMLVideoElement | null>;
  togglePlay: () => void;
  onEnded: () => void;
}>;

export function Player({ currentTrack, mediaRef, togglePlay, onEnded }: PlayerProps) {
  const [showVideo, setShowVideo] = useState(true);
  const isVideo = currentTrack?.type === "video";

  return (
    <>
      <div className={`overflow-hidden transition-[height] flex justify-center bg-black ${isVideo && showVideo ? "h-44 xs:h-56" : "h-0"}`}>
        <video className="cursor-pointer h-44 xs:h-56" ref={mediaRef} controls={false} onClick={togglePlay} onEnded={onEnded}>
          Media not supported
        </video>
      </div>
      {currentTrack && (
        <SlideVertical duration={400}>
          <div className="flex justify-between items-center px-4 pt-2 pb-4 bg-gray-950/50 backdrop-hue-rotate-15">
            <div>
              <div className="text-lg">{currentTrack.title}</div>
              <div className="text-sm">{currentTrack.artist}</div>
            </div>
            {isVideo && (
              <button
                title="Toggle video"
                onClick={() => setShowVideo(!showVideo)}
                className={`p-2 -m-2 transition-[rotate] cursor-pointer ${showVideo ? "" : "rotate-180"} focus-visible:outline-2 focus-visible:outline-secondary-shaded`}
              >
                <FaChevronUp />
              </button>
            )}
          </div>
          <TimeControl mediaRef={mediaRef} currentTrack={currentTrack} />
        </SlideVertical>
      )}
    </>
  );
}
