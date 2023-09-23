import React from "react";
import { Link } from "react-router-dom";

import styles from "./GameScreenshotDisplay.module.css";

const GameScreenshotDisplay = (props) => {
  return (
    <div className={styles.gameScreenshotDisplay}>
      <Link to={`/games/${props.gameId}`} className={styles.link}>
        <img
          className={styles.screenshot}
          src={props.screenshot}
          alt="screenshot"
        />
        <div className={styles.background}>
          <div className={styles.infoContainer}>
            <div className={styles.nameGenre}>
              <h3 className={styles.name}>{props.name}</h3>
              <p className={styles.genre}>{props.genre}</p>
            </div>
            <h3 className={styles.rating}>{props.rating}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameScreenshotDisplay;
