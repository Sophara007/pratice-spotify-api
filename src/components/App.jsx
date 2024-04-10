import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { SearchMusic } from "./search";
import SearchResults from "./SearchResults";
import MusicPlayList from "./PlayList";

const SPOTIFY_API_SEARCH_URL = "https://api.spotify.com/v1/search";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Function to fetch Spotify access token
    const fetchAccessToken = async () => {
      const clientId = 'df04427154724fcd8455c67842b19723';
      const redirectUri = 'http://localhost:3000/?';
      try {
        // Check if the URL contains the access token
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const token = urlParams.get('access_token');
        
        // If access token exists, set it in state
        if (token) {
          setAccessToken(token);
        } else {
          // If access token doesn't exist, redirect user to Spotify authorization page
          const redirectUrl = "https://accounts.spotify.com/authorize" +
  "?client_id=" + encodeURIComponent(clientId) +
  "&response_type=token" +
  "&redirect_uri=" + encodeURIComponent(redirectUri) +
  "&scope=playlist-modify-public%20playlist-modify-private";

          
          window.location.href = redirectUrl;
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
  
    fetchAccessToken();
  }, []);
  

  async function fetchSearchResults(query) {
    try {
      const url = `${SPOTIFY_API_SEARCH_URL}?q=${encodeURIComponent(query)}&type=track`;
      const options = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
      return data.tracks;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  }

  // Function to add a track to the playlist
  const addToPlaylist = (track) => {
    setPlaylist([...playlist, track]);
  };

  // Function to remove a track from the playlist
  const removeFromPlaylist = (index) => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
  };

  // Function to handle search query
  const handleSearch = (query) => {
    fetchSearchResults(query).then((results) => setSearchResults(results));
  };

  return (
    <>
    <h1 style={{
  textAlign: "center",
  fontFamily: "Arial, sans-serif", // Choose a modern font family
  fontSize: "2.5rem", // Adjust the font size as needed
  fontWeight: "bold", // Make the text bold
  color: "#1DB954", // Choose a modern color
  textTransform: "uppercase", // Convert text to uppercase for a stylish look
  letterSpacing: "2px", // Add letter spacing for better readability
  margin: "20px 0", // Add some margin for spacing
}}>
  Spotify Playlist Maker
</h1>

      <div className="search-bar">
        
        <SearchMusic onSearch={handleSearch} />
      </div>
      <main className="main-container">
  <div className="results-container">
    {/* Pass addToPlaylist function as a prop to SearchResults */}
    <SearchResults searchResults={searchResults} onAddToPlaylist={addToPlaylist} playlist={playlist} />

  </div>
  <div className="playlist-container">
    {/* Pass the playlist state, removeFromPlaylist function, and accessToken to MusicPlayList */}
    <MusicPlayList playlist={playlist} onRemoveFromPlaylist={removeFromPlaylist} accessToken={accessToken} />
  </div>
</main>


    </>
  );
}

export default App;
