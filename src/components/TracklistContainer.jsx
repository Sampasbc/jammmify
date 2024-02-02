import React, { useState, useEffect } from "react";
import styles from "../css/modules/_TracklistContainer.module.css";
import TracklistItem from "./TracklistItem";

const TracklistContainer = ({ musics, isPlaylist, currentPlaylistName }) => {
  // const [playlistName, setPlaylistName] = useState("");
  // useEffect(() => {
  //   setPlaylistName(currentPlaylistName);
  // }, [currentPlaylistName]);
  const hasTracks = musics.length > 0;

  const searchTracks = (
    <>
      <h3 className={styles.title}>Songs</h3>
      <div className={styles.tableheadWrapper}>
        <h4 className={styles.thTitle}>Title</h4>
        <h4 className={styles.thAlbum}>Album</h4>
      </div>
      <ul className={styles.list}>
        {hasTracks && (
          <>
            {musics.map((item) => (
              <TracklistItem
                key={item.id}
                src={item.album.images[0].url}
                name={item.name}
                artist={item.artists}
                album={item.album.name}
                duration={item.duration_ms}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );

  const playlistTracks = (
    <>
      <h3 className={styles.title}>{currentPlaylistName}</h3>
      {/* <div className={styles.tableheadWrapper}>
        <h4 className={styles.thTitle}>Title</h4>
        <h4 className={styles.thAlbum}>Album</h4>
      </div>
      <ul className={styles.list}>
        {hasTracks && (
          <>
            {musics.map((item) => (
              <TracklistItem
                key={item.id}
                src={item.album.images[0].url}
                name={item.name}
                artist={item.artists}
                album={item.album.name}
                duration={item.duration_ms}
              />
            ))}
          </>
        )}
      </ul> */}
    </>
  );

  return (
    <div className={styles.tracklistContainer}>
      {isPlaylist ? playlistTracks : searchTracks}
    </div>
  );
};

export default TracklistContainer;
