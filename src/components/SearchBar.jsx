import React, { useState } from "react";
import styles from "../css/modules/_SearchBar.module.css";

const URL = "https://api.spotify.com/v1";

const SearchBar = ({ token, handleSearchResults }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = ({ target }) => {
    setSearchInput(target.value);
  };

  // Search Function
  const handleSearch = async () => {
    const endpoint = "/search";
    const searchQuery = "?q=" + searchInput.trim().replaceAll(" ", "+");
    const type = "&type=track,album,artist";
    const limit = "&limit=20";
    const fullURL = URL + endpoint + searchQuery + type + limit;
    const params = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await fetch(fullURL, params);
      if (response.ok) {
        const data = await response.json();
        handleSearchResults(data);
      } else {
        throw new Error("Search Request failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.searchBar_wrapper}>
      <input
        className={styles.searchBar}
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search by name, author or album..."
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            handleSearch();
          }
        }}
      />
      <input
        className="btn"
        type="button"
        value="find song"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
