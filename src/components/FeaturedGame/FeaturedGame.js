import React from "react";
import { Link } from "react-router-dom";

import styles from "./FeaturedGame.module.css";

const FeaturedGame = (props) => {
  const renderContent = () => {
    const game = props.game,
      screenshot =
        "https:" + game.screenshots[0].url.replace("t_thumb", "t_1080p"),
      cover = "https:" + game.cover.url.replace("t_thumb", "t_cover_big");
    let genres = [];

    if (genres) {
      game.genres.forEach((genre) => {
        genres.push(genre.name);
      });
    }

    return (
      <Link to={`/games/${props.game.id}`}>
        <div className={styles.featuredGameBox}>
          <div className={styles.featuredGame}>
            <img
              src={screenshot}
              className={styles.screenshot}
              alt="Screenshot failed to load"
            />
            <div className={styles.container}>
              <img src={cover} alt="Cover" className={styles.cover} />
              <div className={styles.infoContainer}>
                <h1 className={styles.name}>{game.name}</h1>
                <h3 className={styles.genres}>{genres.join(", ")}</h3>
                <p className={styles.storyline}>
                  {game.storyline ? game.storyline : game.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return renderContent();
};

export default FeaturedGame;
