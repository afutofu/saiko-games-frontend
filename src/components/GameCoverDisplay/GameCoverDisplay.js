import React from "react";
import { Link } from "react-router-dom";

import styles from "./GameCoverDisplay.module.css";

const GameCoverDisplay = (props) => {
  return (
    <Link to={`/games/${props.gameId}`} className={styles.link}>
      <div className={styles.gameCoverDisplay}>
        <img src={props.cover} className={styles.cover} alt="cover" />
        {props.name.length >= 14 ? (
          props.name.length >= 30 ? (
            <div className={styles.infoContainer}>
              <h3 className={styles.nameExtraSmall}>{props.name}</h3>
              <p className={styles.genreExtraSmall}>{props.genre}</p>
              <h3 className={styles.ratingExtraSmall}>{props.rating}</h3>
            </div>
          ) : (
            <div className={styles.infoContainer}>
              <h3 className={styles.nameSmall}>{props.name}</h3>
              <p className={styles.genreSmall}>{props.genre}</p>
              <h3 className={styles.ratingSmall}>{props.rating}</h3>
            </div>
          )
        ) : (
          <div className={styles.infoContainer}>
            <h3 className={styles.name}>{props.name}</h3>
            <p className={styles.genre}>{props.genre}</p>
            <h3 className={styles.rating}>{props.rating}</h3>
          </div>
        )}
      </div>
    </Link>
  );
};

export default GameCoverDisplay;
