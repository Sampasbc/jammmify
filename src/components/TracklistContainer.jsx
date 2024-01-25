import React from "react";
import styles from "../css/modules/_TracklistContainer.module.css";

const TracklistContainer = () => {
  return (
    <div className={styles.tracklistContainer}>
      <h3 className={styles.title}>Songs</h3>
      <div className={styles.tableheadWrapper}>
        <h4 className={styles.thTitle}>Title</h4>
        <h4 className={styles.thAlbum}>Album</h4>
      </div>
      <ul></ul>
    </div>
  );
};

export default TracklistContainer;
