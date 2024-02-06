import React from "react";
import "../css/_button.css";
import styles from "../css/modules/_TracklistContainer.module.css";
import TracklistItem from "./TracklistItem";

const TracklistContainer = ({
  userPlaylists,
  searchTracks,
  playlistTracks,
  isPlaylist,
  currentPlaylist,
  isLoggedIn,
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
                trackId={item.id}
                src={item.album.images ? item.album.images[0].url : ""}
                name={item.name}
                artist={item.artists}
                album={item.album.name}
                duration={item.duration_ms}
                isLoggedIn={isLoggedIn}
                userPlaylists={userPlaylists}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );

  const playlistTracksList = (
    <>
      <div className={styles.titleContainer}>
        <h3 className={styles.playlistTitle}>{currentPlaylist.name}</h3>
        <a
          className="btn_secondary"
          href={currentPlaylist.link}
          target="_blank"
        >
          Listen on Spotify
        </a>
      </div>
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
                trackId={item.track.id}
                src={item.track.album.images[0].url}
                name={item.track.name}
                artist={item.track.artists}
                album={item.track.album.name}
                duration={item.track.duration_ms}
                isLoggedIn={isLoggedIn}
                userPlaylists={userPlaylists}
                isPlaylist={true}
                currentPlaylistId={currentPlaylist.id}
                currentPlaylistName={currentPlaylist.name}
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
