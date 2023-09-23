import React from "react";
import { Link } from "react-router-dom";

import styles from "./TrendingGame.module.css";

const TrendingGame = (props) => {
  return (
    <Link to={`/games/${props.gameId}`}>
      <div className={styles.trendingGame}>
        <img
          src={props.screenshot}
          alt="No screenshot found"
          className={styles.screenshot}
        />
        <div className={styles.container}>
          <img
            src={props.cover}
            alt="No cover found"
            className={styles.cover}
          />
          <div className={styles.infoContainer}>
            <h1 className={styles.name}>{props.name}</h1>
            <h3 className={styles.genres}>{props.genres}</h3>
            <p className={styles.storyline}>{props.storyline}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingGame;
