import React from "react";
import styles from "../css/modules/_TracklistContainer.module.css";
import TracklistItem from "./TracklistItem";

const TracklistContainer = ({
  searchTracks,
  playlistTracks,
  isPlaylist,
  currentPlaylistName,
}) => {
  const searchTracksList = (
    <>
      <h3 className={styles.title}>Songs</h3>
      <div className={styles.tableheadWrapper}>
        <h4 className={styles.thTitle}>Title</h4>
        <h4 className={styles.thAlbum}>Album</h4>
      </div>
      <ul className={styles.list}>
        {searchTracks.length > 0 && (
          <>
            {searchTracks.map((item) => (
              <TracklistItem
                key={item.id}
                src={item.album.images ? item.album.images[0].url : ""}
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

  const playlistTracksList = (
    <>
      <h3 className={styles.playlistTitle}>{currentPlaylistName}</h3>
      <div className={styles.tableheadWrapper}>
        <h4 className={styles.thTitle}>Title</h4>
        <h4 className={styles.thAlbum}>Album</h4>
      </div>
      <ul className={styles.list}>
        {playlistTracks.length > 0 && (
          <>
            {playlistTracks.map((item) => (
              <TracklistItem
                key={item.id}
                src={item.track.album.images[0].url}
                name={item.track.name}
                artist={item.track.artists}
                album={item.track.album.name}
                duration={item.track.duration_ms}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );

  return (
    <div className={styles.tracklistContainer}>
      {isPlaylist ? playlistTracksList : searchTracksList}
    </div>
  );
};

export default TracklistContainer;
