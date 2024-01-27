import React from "react";
import styles from "../css/modules/_TracklistContainer.module.css";
import TracklistItem from "./TracklistItem";

const TracklistContainer = ({ musics }) => {
  return (
    <div className={styles.tracklistContainer}>
      <h3 className={styles.title}>Songs</h3>
      <div className={styles.tableheadWrapper}>
        <h4 className={styles.thTitle}>Title</h4>
        <h4 className={styles.thAlbum}>Album</h4>
      </div>
      <ul className={styles.list}>
        {musics.map((item) => (
          <TracklistItem
            key={item.id}
            src={item.album_cover}
            name={item.name}
            artist={item.artist}
            album={item.album}
            duration={item.duration}
          />
        ))}
      </ul>
    </div>
  );
};

export default TracklistContainer;
