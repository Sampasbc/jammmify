import React from "react";
import styles from "../css/modules/_TracklistItem.module.css";
import { FaPlusCircle } from "react-icons/fa";

const TracklistItem = ({ src, name, artist, album }) => {
  const handleClick = () => {};

  return (
    <li className={styles.tracklistItem}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.albumImg} src={src} alt="Album Cover" />
        </div>
        <div className={styles.titleContainer}>
          <h4 className={styles.songTitle}>{name}</h4>
          <h5 className={styles.songArtist}>{artist}</h5>
        </div>
      </div>
      <h5 className={styles.songAlbum}>{album}</h5>
      <button className="btn_secondary" onClick={handleClick}>
        <FaPlusCircle />
        add
      </button>
    </li>
  );
};

export default TracklistItem;
