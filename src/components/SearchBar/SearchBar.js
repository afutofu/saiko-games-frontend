import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onInputChange = (event) => {
    setSearchValue(event.target.value);
    setRedirect(false);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchValue);
    setSearchValue("");
    setRedirect(true);
  };

  return (
    <React.Fragment>
      <form className={styles.searchBar} onSubmit={onSearch}>
        <input
          type="text"
          onChange={onInputChange}
          value={searchValue}
          className={styles.searchInput}
          placeholder="Search games..."
        />
        <button className={styles.button} type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      {redirect && (
        <Redirect
          to={{
            pathname: "/games",
            search: `?search=${searchTerm}`,
            state: { searchTerm: searchTerm },
          }}
        />
      )}
    </React.Fragment>
  );
};

export default SearchBar;
