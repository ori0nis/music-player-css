import { songs } from "../data/songs";

export const Playlist = ({ playSong }) => {
  return (
    <div>
      <h2 className="text-xl">Playlist</h2>
      {songs.map((song) => (
        <div key={song.id} className="w-[150px]">
          <img src={song.cover_art} alt={song.title} className="object-fit" />
          <p>
            {song.title} - {song.artist}
          </p>
          <p>{song.duration}</p>
          <button onClick={() => playSong(song.id)}>Play song</button>
        </div>
      ))}
    </div>
  );
};
