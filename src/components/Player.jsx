import { useRef, useState } from "react";
import { songs } from "../data/songs";
import { Playlist } from "./Playlist";
import { formatTime } from "../utils/formatTime";

export const Player = () => {
  const audioRef = useRef(null);
  const [songNumber, setSongNumber] = useState(0);
  const [sequentialPlay, setSequentialPlay] = useState(true);
  const [shufflePlay, setShufflePlay] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentSong = songs[songNumber];

  /* Function to flag which song needs to play */
  const playSong = () => {
    audioRef.current.play();
  };

  /* Function to play song depending on Playlist choice */
  const playSongFromPlaylist = (index) => {
    setSongNumber(index);
    requestAnimationFrame(playSong);
  };

  const getNextSongIndex = () => {
    /* Sequential play */
    if (sequentialPlay === true) {
      return songNumber === songs.length - 1 ? 0 : songNumber + 1;
      /* Shuffle play */
    } else if (shufflePlay === true) {
      let next;

      do {
        next = Math.floor(Math.random() * songs.length);
      } while (next === songNumber && songs.length > 1);

      return next;
    }
  };

  const nextSong = () => {
    const nextIndex = getNextSongIndex();
    setSongNumber(nextIndex);
    requestAnimationFrame(playSong);
  };

  const prevSong = () => {
    const prevIndex = songNumber === 0 ? songs.length - 1 : songNumber - 1;
    setSongNumber(prevIndex);
    requestAnimationFrame(playSong);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);

    const timeRemaining = audio.duration - audio.currentTime;
    setSongDuration(timeRemaining);
  };

  return (
    <div className="m-auto max-w-2xl w-full bg-red-500">
      <div className="flex w-full">
        <img src={currentSong.cover_art} alt={currentSong.title} className="w-xs" />
        <div className="flex flex-col">
          <p>
            {currentSong.title} - {currentSong.artist}
          </p>

          <audio
            ref={audioRef}
            src={currentSong.src}
            onLoadedMetadata={() => {
              const audio = audioRef.current;
              setSongDuration(audio.duration - audio.currentTime);
            }}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              const nextIndex = getNextSongIndex();
              setSongNumber(nextIndex);
              requestAnimationFrame(playSong);
            }}
            className="w-xs"
          />

          {/* Progress bar */}
          <div className="w-[75%] h-2 bg-gray-300 rounded-lg mt-4">
            <div className="h-2 bg-orange-400 rounded-lg" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{formatTime(songDuration)}</p>

          <div>
            <button onClick={playSong} className="border text-lg font-semibold pt-1 pb-1 pr-2 pl-2 rounded-lg">
              Play
            </button>
            <button
              onClick={() => audioRef.current.pause()}
              className="border text-lg font-semibold pt-1 pb-1 pr-2 pl-2 rounded-lg"
            >
              Pause
            </button>
            <button onClick={nextSong} className="border text-lg font-semibold pt-1 pb-1 pr-2 pl-2 rounded-lg">
              Next
            </button>
            <button onClick={prevSong} className="border text-lg font-semibold pt-1 pb-1 pr-2 pl-2 rounded-lg">
              Prev
            </button>
            <button
              onClick={() => {
                setSequentialPlay(true);
                setShufflePlay(false);
                localStorage.setItem("play-mode", "sequential-play");
              }}
              className="border text-lg font-semibold pt-1 pb-1 pr-2 pl-2 rounded-lg"
            >
              Sequential play
            </button>
            <button
              onClick={() => {
                setSequentialPlay(false);
                setShufflePlay(true);
                localStorage.setItem("play-mode", "shuffle-play");
              }}
              className="border text-lg font-semibold pt-1 pb-1 pr-2 pl-2 rounded-lg"
            >
              Shuffle play
            </button>
          </div>
        </div>
      </div>

      <Playlist playSong={playSongFromPlaylist} />
    </div>
  );
};
