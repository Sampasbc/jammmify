import React, { useState } from "react";
import spotifyApi from "../spotify";
import styles from "../css/modules/_LoginBtn.module.css";
import { FaSpotify } from "react-icons/fa";

const LoginBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const deleteThisFunction = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const handleLogin = () => {
    const redirectUri = "http://localhost:3000";
    const scopes = [
      "ugc-image-upload",
      "playlist-read-private",
      "playlist-modify-private",
      "playlist-modify-public",
    ];
    const authorizationUrl = spotifyApi.createAuthorizeURL(
      scopes,
      null,
      redirectUri
    );
    window.location.href = authorizationUrl;
  };

  return (
    <>
      {!isLoggedIn ? (
        <button className={styles.loginBtn} onClick={handleLogin}>
          <FaSpotify size="3rem" color="#fafafa" />
          <span className={styles.textLogin}>Login on Spotify</span>
        </button>
      ) : (
        <button className={styles.loginUser} onClick={deleteThisFunction}>
          <span className={styles.textUser}>Logout</span>
          <FaSpotify size="3rem" color="#fafafa" />
        </button>
      )}
    </>
  );
};

export default LoginBtn;
