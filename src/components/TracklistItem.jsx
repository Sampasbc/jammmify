import React, { useState } from "react";
import styles from "../css/modules/_TracklistItem.module.css";
import { FaPlusCircle } from "react-icons/fa";
import TrackDetails from "./TrackDetails";

const TracklistItem = ({ src, name, artist, album, duration }) => {
  const [isActive, setIsActive] = useState(false);
  const handleActive = (active) => {
    setIsActive((prev) => !prev);
  };

  const handleAddBtn = () => {
    const music = {
      name: name,
      artist: artist,
      album: album,
      album_cover: src,
    };
    console.log(JSON.stringify(music));
  };

  return (
    <li className={styles.tracklistItem}>
      {!isActive && (
        <div className={styles.tracklistItemContainer}>
          <div className={styles.infoContainer} onClick={handleActive}>
            <div className={styles.imgContainer}>
              <img className={styles.albumImg} src={src} alt="Album Cover" />
            </div>
            <div className={styles.titleContainer}>
              <h4 className={styles.songTitle}>{name}</h4>
              <h5 className={styles.songArtist}>{artist}</h5>
            </div>
          </div>
          <h5 className={styles.songAlbum} onClick={handleActive}>
            {album}
          </h5>
          <button className="btn_secondary" onClick={handleAddBtn}>
            <FaPlusCircle size="2rem" />
            add
          </button>
        </div>
      )}
      {isActive && (
        <div className={styles.trackdetailsContainer}>
          <TrackDetails
            src={src}
            name={name}
            artist={artist}
            album={album}
            duration={duration}
            handleAddBtn={handleAddBtn}
            handleActive={handleActive}
          />
        </div>
      )}
    </li>
  );
};

export default TracklistItem;
