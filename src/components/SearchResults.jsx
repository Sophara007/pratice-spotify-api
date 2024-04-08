import React from "react";
import "../styles/App.css"; // Import the updated CSS file

function SearchResults({ searchResults, onAddToPlaylist }) {
  // Function to handle adding a track to the playlist
  const handleAddToPlaylist = (track) => {
    onAddToPlaylist(track);
  };

  // Check if searchResults is not an array or does not exist
  if (!searchResults || !Array.isArray(searchResults.items)) {
    return <div className="no-results">No search results</div>;
  }

  return (
    <div className="search-results">
      {searchResults.items.map((track) => (
        <div className="track" key={track.id}>
          <img className="track-image" src={track.album.images[0].url} alt={track.name} />
          <div className="track-info">
            <h3 className="track-name">{track.name}</h3>
            <p className="album-name">Album: {track.album.name}</p>
            <p className="artist-names">Artists: {track.artists.map(artist => artist.name).join(", ")}</p>
            {/* Button to add track to playlist */}
            <button className="add-button" onClick={() => handleAddToPlaylist(track)}>Add to Playlist</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
