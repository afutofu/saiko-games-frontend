import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/">
          <Logo />
        </Link>
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
