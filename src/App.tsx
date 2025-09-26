import { useRef, useState } from "react";
import { TrackList } from "./components/TrackList";
import { tracks } from "./data";
import { Controls } from "./components/Controls";
import { shuffleArray } from "./utils";
import { Header } from "./components/Header";
import { TrackCount } from "./components/TrackCount";
import type { Track } from "./types";

function App() {
  const ref = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [playlistOrder, setPlaylistOrder] = useState(tracks);
  const [playedTracks, setPlayedTracks] = useState(new Set<Track>());
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const toggleShuffled = () => {
    const newIsShuffled = !isShuffled;
    if (newIsShuffled) {
      setPlaylistOrder(shuffleArray(tracks));
    } else {
      setPlaylistOrder(tracks);
    }
    setIsShuffled(newIsShuffled);
  }

  const changeTrack = (to: number) => {
    const currentTrackIndex = playlistOrder.indexOf(currentTrack!);
    const newTrackIndex = currentTrackIndex + to;
    let newTrack: Track;

    if (newTrackIndex < 0) { // set the last track
      newTrack = playlistOrder[playlistOrder.length - 1];
    } else if (newTrackIndex >= playlistOrder.length) {
      newTrack = playlistOrder[0];
    } else {
      newTrack = playlistOrder[newTrackIndex];
    }

    goToTrack(newTrack);
  };

  const goToTrack = (newTrack: Track) => {
    setCurrentTrack(newTrack);
    
    if (ref.current) {
      ref.current.pause();
      ref.current.src = newTrack.src;
      ref.current.onloadeddata = () => {
        ref.current!.onloadeddata = null;

        setTimeout(() => {
          setIsPlaying(true);
          if (ref.current) {
            ref.current.volume = 0.5;
            ref.current.play();
          }
        }, 200);
      };
    }
  };

  const togglePlay = () => {
    if (!currentTrack && !isPlaying) {
      goToTrack(tracks[0]);
      return;
    }
    const newIsPlaying = !isPlaying;
    if (newIsPlaying) {
      if (ref.current) {
        ref.current.volume = 0.5;
        ref.current.play();
      }
    } else {
      ref.current?.pause();
    }
    setIsPlaying(newIsPlaying);
  };

  const trackEnded = () => {
    setPlayedTracks(new Set([...playedTracks, currentTrack!]));
    changeTrack(1);
  };

  return (
    <div className="max-w-[80ch] mx-auto flex flex-col h-[100dvh]">
      <Header />
      <main className="relative flex-1 grid grid-rows-[auto_minmax(30px,1fr)_auto] overflow-y-auto">
        <TrackCount playlistOrder={playlistOrder} />
        <div className="overflow-y-auto border-t border-gray-100/10 rounded-t-lg mt-2 mx-2 focus-visible:outline-2 focus-visible:outline-secondary-shaded">
          <div className="absolute rounded-t-md top-[37px] start-2.5 end-2.5 h-2 bg-gradient-to-b from-black/60 via-black/15 to-transparent z-10"></div>
          <TrackList
            tracks={tracks}
            currentTrack={currentTrack}
            onClick={goToTrack}
            isPlaying={isPlaying}
            playedTracks={playedTracks}
          />
        </div>
        <div className="h-2 -mt-2 bg-gradient-to-t from-black/60 via-black/15 to-transparent z-10"></div>
        <div className="h-[1px] bg-gray-100/10"></div>
        <Controls
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          togglePlaying={togglePlay}
          onNext={() => changeTrack(1)}
          onPrev={() => changeTrack(-1)}
          isShuffled={isShuffled}
          toggleShuffled={toggleShuffled}
          audioRef={ref}
        />
      </main>
      <audio ref={ref} controls={false} onEnded={trackEnded}>
        {/* <track default kind="captions" srcLang="en" /> */}
        Audio not supported
      </audio>
    </div>
  )
}

export default App;
