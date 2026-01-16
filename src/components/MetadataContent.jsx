export const MetadataContent = ({ song }) => (
  <div className="flex gap-2 pr-6 text-sm">
    <span>{song.title}</span>
    <span>-</span>
    <span>{song.artist}</span>
    <span>•</span>
    <span>{song.year}</span>
    <span>•</span>
    <span>{song.producers}</span>
    <span>•</span>
    <span>{song.label}</span>
  </div>
);
