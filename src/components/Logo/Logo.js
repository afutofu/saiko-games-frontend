import React from "react";

import logo from "../../assets/logo/logo.png";

import styles from "./Logo.module.css";

const Logo = (props) => {
  return (
    <img
      onClick={props.onLogoClick}
      className={styles.logo}
      src={logo}
      alt="Logo"
    />
  );
};

export default Logo;
