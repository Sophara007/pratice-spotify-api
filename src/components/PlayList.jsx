import React, { useState } from "react";
import "../styles/playlist.css"; // Import CSS file for styling

function MusicPlayList({ playlist, onRemoveFromPlaylist, accessToken }) {
  const [playlistName, setPlaylistName] = useState("");
  const [saving, setSaving] = useState(false); // State to manage saving/loading state

  const handleRenamePlaylist = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleRemoveFromPlaylist = (index) => {
    onRemoveFromPlaylist(index);
  };

  const saveToSpotify = async () => {
    try {
      setSaving(true); // Set saving state to true when saving starts

      const userId = '21yoiurxhm47jb4d5mwj3mema';
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: playlistName
        })
      });
  
      if (!createPlaylistResponse.ok) {
        throw new Error("Failed to create playlist");
      }
  
      const createPlaylistData = await createPlaylistResponse.json();
      const playlistId = createPlaylistData.id;
  
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uris: playlist.map(track => track.uri)
        })
      });
  
      if (!addTracksResponse.ok) {
        throw new Error("Failed to add tracks to playlist");
      }
  
      setPlaylistName("");
      onRemoveFromPlaylist([]);
    } catch (error) {
      console.error("Error saving playlist to Spotify:", error);
    } finally {
      setSaving(false); // Set saving state to false when saving completes
    }
  };

  return (
    <div className="playlist-container">
      <h1 className="playlist-header">
        <input
          type="text"
          value={playlistName}
          onChange={handleRenamePlaylist}
          placeholder="Enter Playlist Name"
          style={{
            border: 'none',
            backgroundColor: '#f0f0f0',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '7px 12px',
            borderRadius: '3px',
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s, box-shadow 0.3s',
            width: 'calc(100% - 100px)', // Set width relative to parent's width minus button width
            maxWidth: '300px', // Set maximum width for responsiveness
            marginRight: '10px', // Add spacing to the right of the input field
          }}
        />
        <button
          onClick={saveToSpotify}
          style={{
            backgroundColor: '#61dafb',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            minWidth: '120px', // Set min width for button
            width: 'auto', // Allow button width to adjust based on content
          }}
          disabled={saving} // Disable the button while saving/loading
        >
          {saving ? "Saving..." : "Save To Spotify"}
        </button>
      </h1>
      <ul className="playlist-tracks">
        {playlist.map((track, index) => (
          <li key={index} className="playlist-track">
            <div>
              <p className="track-name">{track.name}</p>
              <p className="track-details">
                {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                {track.album.name}
              </p>
            </div>
            <button
              onClick={() => handleRemoveFromPlaylist(index)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicPlayList;
