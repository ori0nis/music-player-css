import { songs } from "../data/songs";

export const Playlist = ({ playSong }) => {
  return (
    <div className="max-w-75 m-auto flex flex-col gap-2">
      <h2 className="text-2xl text-center font-semibold mb-2 text-orange-400 bg-black w-fit m-auto py-1 px-2 rounded-lg">
        PLAYLIST
      </h2>
      {songs.map((song) => (
        <div key={song.id} className="flex gap-1 bg-gray-200 rounded-lg">
          <div className="w-28">
            <img src={song.cover_art} alt={song.title} className="object-cover rounded-lg block " />
          </div>

          <div className="space-y-0.5 px-1 py-2">
            <p className="text-sm font-semibold">{song.title}</p>
            <p className="text-sm">{song.artist}</p>
            <p className="text-sm">{song.duration}</p>
            <button
              onClick={() => playSong(song.id)}
              className="border text-sm font-semibold rounded-lg p-1 cursor-pointer hover:bg-orange-400 transition-all duration-300"
            >
              Play song
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
