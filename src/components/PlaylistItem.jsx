import React from "react";
import styles from "../css/modules/_PlaylistItem.module.css";

const PlaylistItem = ({
  src,
  playlistName,
  playlistAuthor,
  tracks,
  handlePlaylistTracks,
  playlistId,
  getPlaylistName,
  isModal,
  handleClose,
  handleAddMusicToPlaylist,
}) => {
  const handleFetchPlaylist = async () => {
    const accessToken = localStorage.getItem("access_token");
    const url = "https://api.spotify.com/v1/playlists/";
    const endpoint = "/tracks";
    const fullUrl = url + playlistId + endpoint;
    const params = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    try {
      const result = await fetch(fullUrl, params);
      if (result.ok) {
        const data = await result.json();
        // console.log(data.items);
        getPlaylistName(playlistName);
        handlePlaylistTracks(data);
      } else {
        throw new Error("Fetch Playlist Tracks Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddSong = () => {
    console.log("add this motherfckin song");
    handleAddMusicToPlaylist(playlistId, playlistName);
    handleClose();
  };

  return (
    <li
      className={styles.playlistWrapper}
      onClick={!isModal ? handleFetchPlaylist : handleAddSong}
    >
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
