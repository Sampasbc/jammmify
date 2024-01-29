import React from "react";
import styles from "../css/modules/_TrackDetails.module.css";
import { FaPlusCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const TrackDetails = ({
  src,
  name,
  artist,
  album,
  duration,
  handleAddBtn,
  handleActive,
}) => {
  const formatDuration = (duration) => {
    const minutes = (duration / 60).toFixed(0);
    const seconds = duration % 60;
    if (duration % 60 === 0) {
      return minutes + "min";
    }
    return minutes + ":" + seconds + "min";
  };

  return (
    <div className={styles.trackDetails}>
      <div className={styles.detailsContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.albumImg} src={src} alt="Album Cover" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h4 className={styles.songTitle}>{name}</h4>
            <h5 className={styles.songInfo}>
              Artist: <span className={styles.infoData}>{artist}</span>
            </h5>
            <h5 className={styles.songInfo}>
              Album: <span className={styles.infoData}>{album}</span>
            </h5>
            <h5 className={styles.songInfo}>
              Song Duration:{" "}
              <span className={styles.infoData}>
                {formatDuration(duration)}
              </span>
            </h5>
          </div>
          <button className="btn_secondary" onClick={handleAddBtn}>
            <FaPlusCircle size="2rem" />
            add song to a playlist
          </button>
        </div>
      </div>
      <button className={styles.closeBtn} onClick={handleActive}>
        <IoClose size="2.5rem" />
      </button>
    </div>
  );
};

export default TrackDetails;
