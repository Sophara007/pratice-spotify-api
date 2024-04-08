import React, { useState } from "react";
import "../styles/SearchMusic.css"; // Import the updated CSS file

export function SearchMusic({ onSearch }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(search);
    setSearch("");
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search for music..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
