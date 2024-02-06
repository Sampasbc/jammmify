import React, { useEffect, useState } from "react";
import styles from "../css/modules/_TrackDetails.module.css";
import { FaPlusCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";

const TrackDetails = ({
  src,
  name,
  artist,
  album,
  duration,
  trackPreview,
  handleAddBtn,
  handleRemoveSong,
  handleActive,
  isLoggedIn,
  isPlaylist,
}) => {
  const [songPreview, setSongPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (trackPreview) {
      const preview = new Audio(`${trackPreview}`);
      preview.addEventListener("ended", handlePreviewEnd);
      setSongPreview(preview);
      return () => {
        preview.pause();
        preview.removeEventListener("ended", handlePreviewEnd);
      };
    }
  }, []);

  // TOGGLE STATUS AND PLAY/PAUSE PREVIEW
  const handlePlay = () => {
    if (!songPreview) return;
    if (!isPlaying) {
      songPreview.play();
    } else {
      songPreview.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  // HANDLE PREVIEW END
  const handlePreviewEnd = () => {
    setIsPlaying(false);
  };

  // HANDLE MOUSE HOVER DISPLAY PLAY BUTTON
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  // FORMAT SONG DURATION
  const formatDuration = (duration) => {
    const durationInSeconds = (duration / 1000).toFixed(0);

    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = durationInSeconds % 60;
    if (durationInSeconds % 60 === 0) {
      return minutes + ":00";
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };

  return (
    <div className={styles.trackDetails}>
      <div className={styles.detailsContainer}>
        <div
          className={styles.imgContainer}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovered && (
            <button className={styles.playBtn} onClick={handlePlay}>
              {!isPlaying ? (
                <FaRegCirclePlay size="8rem" />
              ) : (
                <FaRegCirclePause size="8rem" />
              )}
            </button>
          )}

          <img className={styles.albumImg} src={src} alt="Album Cover" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h4 className={styles.songTitle}>{name}</h4>
            <div className="artists_container">
              <h5 className={styles.songInfo}>
                {artist.length > 1 ? "Artists:" : "Artist:"}
                {artist.map((item, index) => {
                  return index === artist.length - 1 ? (
                    <span className={styles.infoData}>{item.name}</span>
                  ) : (
                    <span className={styles.infoData}>{item.name + ", "}</span>
                  );
                })}
              </h5>
            </div>
            <h5 className={styles.songInfo}>
              Album:<span className={styles.infoData}>{album}</span>
            </h5>
            <h5 className={styles.songInfo}>
              Song Duration:
              <span className={styles.infoData}>
                {formatDuration(duration)}
              </span>
            </h5>
          </div>
          <div className={styles.btnWrapper}>
            {isLoggedIn ? (
              <>
                <button className="btn_secondary" onClick={handleAddBtn}>
                  <FaPlusCircle size="2rem" />
                  add song to a playlist
                </button>
                {isPlaylist && (
                  <button
                    className="btn_secondary remove_btn"
                    onClick={handleRemoveSong}
                  >
                    remove from playlist
                  </button>
                )}
              </>
            ) : (
              <button
                className="btn_secondary btn_disabled"
                onClick={handleAddBtn}
                disabled
              >
                Login to add the song to a playlist
              </button>
            )}
          </div>
        </div>
      </div>
      <button className={styles.closeBtn} onClick={handleActive}>
        <IoClose size="2.5rem" />
      </button>
    </div>
  );
};

export default TrackDetails;
