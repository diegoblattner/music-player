import { useState } from 'react';
import { TrackList } from './components/TrackList';
import { tracks } from "./data";
import { Controls } from './components/Controls';
import type { Track } from './types';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [playlistOrder, setPlaylistOrder] = useState(tracks);
  const [playedTracks, setPlayedTracks] = useState(new Set<Track>());
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  
  function toggleShuffled() {
    const newIsShuffled = !isShuffled;
    if (newIsShuffled) {
      setPlaylistOrder(shuffleArray(tracks));
    } else {
      setPlaylistOrder(tracks);
    }
    setIsShuffled(newIsShuffled);
  }

  function changeTrack(to: number) {
    const currentTrackIndex = playlistOrder.indexOf(currentTrack!);
    const newTrackIndex = currentTrackIndex + to;

    if (newTrackIndex < 0) { // set the last track
      setCurrentTrack(playlistOrder[playlistOrder.length - 1]);
    } else if (newTrackIndex >= playlistOrder.length) {
      setCurrentTrack(playlistOrder[0]);
    } else {
      setCurrentTrack(playlistOrder[newTrackIndex]);
    }
  }

  return (
    <div className='max-w-[500px] mx-auto flex flex-col h-[100dvh] bg-gray-900 text-white'>
      <header className='p-4 text-4xl'>
        <h1>Music player app 🎧</h1>
      </header>
      <main className='flex-1 grid grid-rows-[minmax(30px,1fr)_auto] overflow-y-auto'>
        <div className='overflow-y-auto mt-2 md:mx-2'>
          <TrackList
            tracks={tracks}
            currentTrack={currentTrack}
            onClick={setCurrentTrack}
            isPlaying={isPlaying}
            playedTracks={playedTracks}
          />
        </div>
        <Controls
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          togglePlaying={() => setIsPlaying(!isPlaying)}
          onNext={() => changeTrack(1)}
          onPrev={() => changeTrack(-1)}
          isShuffled={isShuffled}
          toggleShuffled={toggleShuffled}
        />
      </main>
    </div>
  )
}

export default App;
