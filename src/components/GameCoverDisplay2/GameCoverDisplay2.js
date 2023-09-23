import React from "react";
import { Link } from "react-router-dom";

import noCover from "../../assets/images/noCover.jpg";
import styles from "./GameCoverDisplay2.module.css";

const GameCoverDisplay2 = (props) => {
  return (
    <Link to={`/games/${props.gameId}`}>
      <div className={styles.gameCoverDisplay}>
        {props.cover ? (
          <img
            src={props.cover}
            alt="No cover found"
            className={styles.cover}
          />
        ) : (
          <img src={noCover} alt="No cover found" className={styles.cover} />
        )}

        <div className={styles.infoContainer}>
          <h3 className={styles.name}>{props.name}</h3>
          <p className={styles.genres}>{props.genres.join(", ")}</p>
          {props.storyline ? (
            <p className={styles.storyline}>{props.storyline}</p>
          ) : props.summary ? (
            <p className={styles.storyline}>{props.summary}</p>
          ) : null}
          <h3 className={styles.rating}>{props.rating ? props.rating : ""}</h3>
        </div>
      </div>
    </Link>
  );
};

export default GameCoverDisplay2;
