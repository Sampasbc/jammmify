import React from "react";
import PlaylistItem from "./PlaylistItem";

const PlaylistContainer = ({ playlists }) => {
  return (
    <div className="playlistContainer">
      <h3>Playlists</h3>
      <ul>
        {playlists.map((list) => (
          <PlaylistItem
            src={list.imgSrc}
            playlistName={list.name}
            playlistAuthor={list.author}
          />
        ))}
      </ul>
    </div>
  );
};

export default PlaylistContainer;
