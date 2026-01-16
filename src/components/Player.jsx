import { useEffect, useRef, useState } from "react";
import { songs } from "../data/songs";
import { Playlist } from "./Playlist";
import { formatTime } from "../utils/formatTime";
import { Button } from "./Button";
import { MetadataAnimation } from "./MetadataAnimation";

export const Player = ({ currentSong, songNumber, setSongNumber }) => {
  const audioRef = useRef(null);
  const [shufflePlay, setShufflePlay] = useState(() => {
    return localStorage.getItem("play-mode") === "shuffle-play" ? true : false;
  });
  const [songDuration, setSongDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  /* Button states */
  const [isShuffleActive, setIsShuffleActive] = useState(shufflePlay);
  const [isPlayActive, setIsPlayActive] = useState(false);

  /* useEffect() flags which song needs to play, makes sure autoplay works */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayActive(true))
        .catch(() => {});
    }
  }, [songNumber]);

  const playSong = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlayActive(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlayActive(false);
  };

  /* Function to play song depending on Playlist choice */
  const playSongFromPlaylist = (index) => {
    setSongNumber(index);
  };

  const getNextSongIndex = () => {
    if (!shufflePlay) {
      return songNumber === songs.length - 1 ? 0 : songNumber + 1;
    } else {
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
  };

  const prevSong = () => {
    const prevIndex = songNumber === 0 ? songs.length - 1 : songNumber - 1;
    setSongNumber(prevIndex);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);

    const timeRemaining = audio.duration - audio.currentTime;
    setSongDuration(timeRemaining);
  };

  const toggleShuffle = () => {
    setShufflePlay((prev) => {
      const newValue = !prev;
      localStorage.setItem("play-mode", newValue ? "shuffle-play" : "sequential-play");
      setIsShuffleActive(newValue);
      return newValue;
    });
  };

  return (
    <div className="m-auto max-w-2xl w-full flex flex-col gap-13 pb-8">
      <div className="flex flex-col small-player:flex-row w-fit m-auto gap-2 rounded-lg mt-15 bg-gray-100/60">
        <img src={currentSong.cover_art} alt={currentSong.title} className="rounded-xl w-60 h-auto" />
        <div className="flex flex-col justify-center p-2">
          <p className="text-center font-semibold text-xl">{currentSong.title}</p>
          <p className="text-center text-md">{currentSong.artist}</p>

          {/* Audio */}
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
            }}
          />

          {/* Progress bar */}
          <div
            className="h-2 bg-gray-300 rounded-lg mt-4"
            onClick={(e) => {
              const bar = e.currentTarget;
              const width = bar.clientWidth;
              const clickX = e.clientX - bar.getBoundingClientRect().left;
              const clickPercent = clickX / width;
              audioRef.current.currentTime = clickPercent * audioRef.current.duration;
            }}
          >
            <div className="h-2 bg-orange-400 rounded-lg" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="py-1">{formatTime(songDuration)}</p>

          {/* Control buttons */}
          <div className="grid grid-cols-[50px_50px_50px_50px] gap-1 justify-center">
            <Button id="prev" onClick={prevSong} />
            <Button id="play" onClick={playSong} isActive={isPlayActive} />
            <Button id="pause" onClick={pauseSong} isActive={!isPlayActive} />
            <Button id="next" onClick={nextSong} />
            <Button id="shuffle" onClick={toggleShuffle} isActive={isShuffleActive} />
            <Button id="minus-5" onClick={() => (audioRef.current.currentTime -= 5)} />
            <Button id="plus-5" onClick={() => (audioRef.current.currentTime += 5)} />
          </div>
        </div>
      </div>

      <MetadataAnimation currentSong={currentSong} />

      <Playlist playSong={playSongFromPlaylist} />
    </div>
  );
};
