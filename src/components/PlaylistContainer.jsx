import React from "react";
import PlaylistItem from "./PlaylistItem";
import styles from "../css//modules/_PlaylistContainer.module.css";

const PlaylistContainer = ({ playlists, userPlaylists, isLoggedIn }) => {
  // const playlistsArray = userPlaylists;

  return (
    <div className={styles.playlistContainer}>
      {!isLoggedIn ? (
        <>
          <h3 className={styles.title}>Playlists</h3>
          <h3 className={styles.title}>Login to see your playlists</h3>
        </>
      ) : (
        <>
          <h3 className={styles.title}>Playlists</h3>
          {userPlaylists && (
            <ul className={styles.list}>
              {userPlaylists.map((list) => (
                <PlaylistItem
                  key={list.id}
                  src={list.images[0].url}
                  playlistName={list.name}
                  playlistAuthor={list.owner.display_name}
                  tracks={list.tracks}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default PlaylistContainer;
