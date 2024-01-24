import React from "react";

const PlaylistItem = ({ src, playlistName, playlistAuthor }) => {
  return (
    <div>
      <img src={src} alt="Playlist" />
      <div>
        <h4>{playlistName}</h4>
        <h5>{playlistAuthor}</h5>
      </div>
    </div>
  );
};

export default PlaylistItem;
