import "./css/App.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PlaylistContainer from "./components/PlaylistContainer";

function App() {
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

  useEffect(() => {
    console.log(playlists);
  }, [playlists]);

  return (
    <div className="App">
      <Header>
        <SearchBar />
      </Header>
      <PlaylistContainer playlists={playlists} />
    </div>
  );
}

export default App;
