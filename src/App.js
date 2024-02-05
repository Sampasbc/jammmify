import React, { useEffect, useState } from "react";
import "./css/App.css";
import "./css/_button.css";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PlaylistContainer from "./components/PlaylistContainer";
import TracklistContainer from "./components/TracklistContainer";
import Footer from "./components/Footer";
import {
  redirectToAuthCodeFlow,
  getUserProfile,
  getUserPlaylists,
} from "./spotify";

const CLIENT_ID = "9db45e5eeb2a48ccaa82c44bb7dfe32f";
const CLIENT_SECRET = "f2857cbf3b2b4777a4f681a61f8d727b";

function App() {
  // GLOBAL STATES
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [profile, setProfile] = useState(undefined);

  // APP START
  useEffect(() => {
    const isLogged = localStorage.getItem("is_logged_in");
    const accessToken = localStorage.getItem("access_token");
    // Check if user is logged in
    if (isLogged === "false" || isLogged === null) {
      setIsLoggedIn(false);
      localStorage.setItem("is_logged_in", false);
      console.log("is NOT logged in");
      return;
    }
    console.log("is logged in");
    setIsLoggedIn(true);
    getUserProfile(accessToken).then((profile) => {
      setProfile(profile);
      // console.log(profile);
      localStorage.setItem("profile_id", profile.id);
    });
  }, [isLoggedIn]);

  // useEffect(() => {
  //   console.log(isLoggedIn);
  // }, [isLoggedIn]);

  // GET USER PLAYLISTS
  const [userPlaylists, setUserPlaylist] = useState(null);
  useEffect(() => {
    if (profile === undefined) return;

    const accessToken = localStorage.getItem("access_token");
    // console.log(profile);
    getUserPlaylists(accessToken).then((playlists) => {
      setUserPlaylist(playlists);
    });
  }, [profile]);

  // GET JAMMMIFY ACCESS TOKEN (APP CREDENTIALS)
  const [appAccessToken, setAppAccessToken] = useState("");
  useEffect(() => {
    const params = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    const fetchAccessToken = async () => {
      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          params
        );
        if (response.ok) {
          const data = await response.json();
          setAppAccessToken(data["access_token"]);
        } else {
          throw new Error("Request Failed!");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchAccessToken();
  }, []);

  // HANDLE LOGIN
  const handleLogIn = async () => {
    await redirectToAuthCodeFlow(CLIENT_ID, setIsLoggedIn);
  };

  // HANDLE LOGOUT
  const handleLogOut = () => {
    localStorage.removeItem("verifier");
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile_id");
    localStorage.setItem("is_logged_in", false);
    setIsLoggedIn(false);
    setProfile(undefined);
    setUserPlaylist(null);
  };

  // HANDLE SEARCH
  const [searchTracks, setSearchTracks] = useState([]);
  const handleSearchTracks = (results) => {
    setIsPlaylist(false);
    setSearchTracks(results.tracks.items);
  };

  useEffect(() => {
    console.log(searchTracks);
  }, [searchTracks]);

  // HANDLE OPEN PLAYLIST
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const handlePlaylistTracks = (results) => {
    setIsPlaylist(true);
    setPlaylistTracks(results.items);
  };

  useEffect(() => {
    console.log(playlistTracks);
  }, [playlistTracks]);

  // GET ACTIVE PLAYLIST NAME
  const [currentPlaylistName, setCurrentPlaylistName] = useState("");
  const getPlaylistName = (result) => {
    setCurrentPlaylistName(result);
  };

  return (
    <div className="App">
      <div className="main">
        <Header
          clientId={CLIENT_ID}
          isLoggedIn={isLoggedIn}
          profile={profile}
          handleLogin={handleLogIn}
          handleLogout={handleLogOut}
        >
          <SearchBar
            token={appAccessToken}
            handleSearchResults={handleSearchTracks}
          />
        </Header>
        <div className="contentWrapper">
          <PlaylistContainer
            isLoggedIn={isLoggedIn}
            userPlaylists={userPlaylists}
            handlePlaylistTracks={handlePlaylistTracks}
            getPlaylistName={getPlaylistName}
          />
          <TracklistContainer
            userPlaylists={userPlaylists}
            searchTracks={searchTracks}
            playlistTracks={playlistTracks}
            isLoggedIn={isLoggedIn}
            isPlaylist={isPlaylist}
            currentPlaylistName={currentPlaylistName}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
