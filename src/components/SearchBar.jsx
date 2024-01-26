import React, { useState } from "react";
import styles from "../css/modules/_SearchBar.module.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = ({ target }) => {
    setSearchInput(target.value);
  };

  return (
    <div className={styles.searchBar_wrapper}>
      <input
        className={styles.searchBar}
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search by name, author or album..."
      />
      <input className="btn" type="button" value="find song" />
    </div>
  );
};

export default SearchBar;
