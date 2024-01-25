import "./css/App.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PlaylistContainer from "./components/PlaylistContainer";
import TracklistContainer from "./components/TracklistContainer";

function App() {
  // Fecth Playlists
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("./playlists.json");
        if (response.status === 200) {
          const data = await response.json();
          setPlaylists(data["playlists"]);
        } else {
          throw new Error("Request Failed!");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlaylists();
  }, []);

  // Fetch Music tracks
  const [musicTracks, setMusicTracks] = useState([]);
  useEffect(() => {
    const fetchMusicTracks = async () => {
      try {
        const response = await fetch("./musics.json");
        if (response.ok) {
          const data = await response.json();
          setMusicTracks(data["musics"]);
        } else {
          throw new Error("Request Failed!");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchMusicTracks();
  }, []);

  useEffect(() => {
    console.log(playlists);
  }, [playlists]);

  useEffect(() => {
    console.log(musicTracks);
  }, [musicTracks]);

  return (
    <div className="App">
      <Header>
        <SearchBar />
      </Header>
      <div className="contentWrapper">
        <PlaylistContainer playlists={playlists} />
        <TracklistContainer musics={musicTracks} />
      </div>
    </div>
  );
}

export default App;
