import React from "react";
import Styles from "../css/modules/_Header.module.css";

const Header = ({ children }) => {
  return (
    <div className={Styles.header}>
      <h1 className={Styles.title}>
        ja<span>mmm</span>ify
      </h1>
      {children}
    </div>
  );
};

export default Header;
