import { useState } from "react";
import { songs } from "./data/songs";
import { Player } from "./components/Player";

function App() {
  const [songNumber, setSongNumber] = useState(0);
  const currentSong = songs[songNumber];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110 transition-all duration-1000"
        style={{ backgroundImage: `url(${currentSong.cover_art})` }}
      ></div>

      <div className="relative z-10">
        <Player currentSong={currentSong} songNumber={songNumber} setSongNumber={setSongNumber} />
      </div>
    </div>
  );
}

export default App;
