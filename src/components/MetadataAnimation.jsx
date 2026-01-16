import { MetadataContent } from "./MetadataContent";

export const MetadataAnimation = ({ currentSong }) => {
  return (
    <div className="w-60 small-player:w-80 h-10 overflow-hidden whitespace-nowrap m-auto border rounded-lg bg-orange-400 flex items-center">
      {/* Jukebox icon */}
      <div className="flex items-center justify-center w-8 h-full shrink-0 bg-orange-500 z-999 border-r">
        <svg width="21" height="21">
          <use href={`/assets/spritesheet.svg#icon-play`} />
        </svg>
      </div>

      {/* Marquee */}
      <div key={currentSong.id} className="inline-flex gap-8 animate-metadata-marquee border rounded-lg bg-orange-200">
        <MetadataContent song={currentSong} />
        <MetadataContent song={currentSong} />
      </div>
    </div>
  );
};
