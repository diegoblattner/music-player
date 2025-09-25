import { useRef, useState } from "react";
import { TrackList } from "./components/TrackList";
import { tracks } from "./data";
import { Controls } from "./components/Controls";
import type { Track } from "./types";

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = new Array<T>(...array);
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }
  return shuffledArray;
}

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
          ref.current?.play();
        }, 200);
      };
    }
  };

  const togglePlay = () => {
    const newIsPlaying = !isPlaying;
    if (newIsPlaying) {
      ref.current?.play();
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
    <div className="max-w-[500px] mx-auto flex flex-col h-[100dvh] bg-gradient-to-tr from-gray-900 via-neutral-800 to-slate-950 text-white">
      <header className="p-4 text-4xl">
        <h1>Music player app 🎧</h1>
      </header>
      <main className="relative flex-1 grid grid-rows-[minmax(30px,1fr)_auto] overflow-y-auto">
        <div className="overflow-y-auto border-t border-gray-100/10 rounded-t-lg mt-2 mx-2">
        <div className="absolute mx-1.5 rouded-t-lg top-2 w-full h-[1px]  shadow-black shadow z-10"></div>
          <TrackList
            tracks={tracks}
            currentTrack={currentTrack}
            onClick={goToTrack}
            isPlaying={isPlaying}
            playedTracks={playedTracks}
          />
        </div>
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
