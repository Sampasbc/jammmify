import React from "react";
import styles from "../css/modules/_Header.module.css";
import LoginBtn from "./LoginBtn";

const Header = ({ children }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        ja<span>mmm</span>ify
      </h1>
      <div className={styles.loginBtn}>
        <LoginBtn className={styles.loginBtn} />
      </div>
      {children}
    </div>
  );
};

export default Header;
