import React from "react";
import PlaylistItem from "./PlaylistItem";
import styles from "../css//modules/_PlaylistContainer.module.css";

const PlaylistContainer = ({ playlists, userPlaylists }) => {
  const playlistsArray = userPlaylists.items;

  return (
    <div className={styles.playlistContainer}>
      <h3 className={styles.title}>Playlists</h3>
      <ul className={styles.list}>
        {playlistsArray.map((list) => (
          <PlaylistItem
            key={list.id}
            src={list.images[0].url}
            playlistName={list.name}
            playlistAuthor={list.owner.display_name}
          />
        ))}
      </ul>
    </div>
  );
};

export default PlaylistContainer;
