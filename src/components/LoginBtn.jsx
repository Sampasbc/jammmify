import React, { useState } from "react";
import styles from "../css/modules/_LoginBtn.module.css";
import { FaSpotify } from "react-icons/fa";

const LoginBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const deleteThisFunction = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <>
      {!isLoggedIn ? (
        <button className={styles.loginBtn} onClick={deleteThisFunction}>
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
