import React from "react";
import PlaylistItem from "./PlaylistItem";

const PlaylistContainer = ({ playlists }) => {
  return (
    <div className="playlist_container">
      {playlists.map((list) => (
        <PlaylistItem
          src={list.imgSrc}
          playlistName={list.name}
          playlistAuthor={list.author}
        />
      ))}
    </div>
  );
};

export default PlaylistContainer;
