import React from "react";
import styles from "../css/modules/_LoginBtn.module.css";
import { FaSpotify } from "react-icons/fa";

const LoginBtn = ({ isLoggedIn, profile, handleLogin, handleLogout }) => {
  return (
    <>
      {!isLoggedIn ? (
        <button className={styles.loginBtn} onClick={handleLogin}>
          <FaSpotify size="3rem" color="#fafafa" />
          <span className={styles.textLogin}>Login on Spotify</span>
        </button>
      ) : (
        <div className={styles.logoutWrapper}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.User}>
            <span className={styles.textUser}>
              {profile && profile.display_name}
            </span>
            <div className={styles.imageWrapper}>
              <img
                src={profile !== undefined ? profile.images[0].url : ""}
                alt="Profile Avatar"
              />
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default LoginBtn;
