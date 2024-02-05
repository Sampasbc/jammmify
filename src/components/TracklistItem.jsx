import React, { useState } from "react";
import styles from "../css/modules/_TracklistItem.module.css";
import { FaPlusCircle } from "react-icons/fa";
import TrackDetails from "./TrackDetails";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { addSongToPlaylist } from "../spotify";

const TracklistItem = ({
  src,
  name,
  artist,
  album,
  duration,
  isLoggedIn,
  userPlaylists,
  trackId,
}) => {
  let PLAYLIST_ID = "";
  let PLAYLIST_NAME = "";

  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // OPEN AND CLOSE DETAILS
  const handleActive = (active) => {
    setIsActive((prev) => !prev);
  };

  // ADD BTN EVENT HANDLER
  const handleAddBtn = () => {
    // setSongToAddId(trackId);
    // setSongToAddName(name);
    setIsModalOpen(true);
  };

  // CHOOSE PLAYLIST & ADD SONG EVENT HANDLER
  const handleAddMusicToPlaylist = (playlistId, playlistName) => {
    const accessToken = localStorage.getItem("access_token");
    PLAYLIST_ID = playlistId;
    PLAYLIST_NAME = playlistName;

    addSongToPlaylist(accessToken, PLAYLIST_ID, PLAYLIST_NAME, trackId, name);
  };

  // CLOSE MODAL EVENT HANDLER
  const handleClose = () => {
    setIsModalOpen(false);
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
              <h5 className={styles.songArtist}>
                {/* Checks if it's the last one and put a comma after it if not */}
                {artist.map((item, index) => {
                  return index === artist.length - 1
                    ? item.name
                    : item.name + ", ";
                })}
              </h5>
            </div>
          </div>
          <h5 className={styles.songAlbum} onClick={handleActive}>
            {album}
          </h5>
          {isLoggedIn && (
            <>
              <button className="btn_secondary" onClick={handleAddBtn}>
                <FaPlusCircle size="2rem" />
                add
              </button>
              {isModalOpen && (
                <AddToPlaylistModal
                  userPlaylists={userPlaylists}
                  handleClose={handleClose}
                  handleAddMusicToPlaylist={handleAddMusicToPlaylist}
                />
              )}
            </>
          )}
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
            isLoggedIn={isLoggedIn}
            handleAddBtn={handleAddBtn}
            handleActive={handleActive}
          />
        </div>
      )}
    </li>
  );
};

export default TracklistItem;
