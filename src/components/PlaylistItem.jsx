import React from "react";
import styles from "../css/modules/_PlaylistItem.module.css";

const PlaylistItem = ({ src, playlistName, playlistAuthor, tracks }) => {
  return (
    <li className={styles.playlistWrapper}>
      <div className={styles.imgContainer}>
        <img className={styles.playlistImg} src={src} alt="Playlist" />
      </div>
      <div className={styles.infoContainer}>
        <h4 className={styles.playlistTitle}>{playlistName}</h4>
        <h5 className={styles.playlistAuthor}>{playlistAuthor}</h5>
      </div>
    </li>
  );
};

export default PlaylistItem;
