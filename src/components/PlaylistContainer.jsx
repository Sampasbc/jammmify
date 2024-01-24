import React from "react";
import PlaylistItem from "./PlaylistItem";
import { PLAYLISTS } from "../App";

const PlaylistContainer = () => {
  return (
    <div className="playlist_container">
      {PLAYLISTS.map((list) => (
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
