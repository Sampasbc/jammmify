import React from "react";
import styles from "../css/modules/_AddToPlaylistModal.module.css";
import PlaylistItem from "./PlaylistItem";
import { IoClose } from "react-icons/io5";

const AddToPlaylistModal = ({
  userPlaylists,
  handleClose,
  handleAddMusicToPlaylist,
}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Choose a playlist to add</h2>
        <button className={styles.closeBtn} onClick={handleClose}>
          <IoClose size="2.5rem" />
        </button>
        {userPlaylists && (
          <ul className={styles.list}>
            {userPlaylists.map((list) => (
              <PlaylistItem
                key={list.id}
                playlistId={list.id}
                src={list.images[0].url}
                playlistName={list.name}
                playlistAuthor={list.owner.display_name}
                tracks={list.tracks}
                isModal={true}
                handleClose={handleClose}
                handleAddMusicToPlaylist={handleAddMusicToPlaylist}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
