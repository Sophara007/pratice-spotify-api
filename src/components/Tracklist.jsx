import React from 'react';
import Track from './Track'; // Import the Track component

function Tracklist({ tracks }) {
  return (
    <div className="tracklist">
      {tracks.map(track => (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          duration={track.duration}
        />
      ))}
    </div>
  );
}

export default Tracklist;