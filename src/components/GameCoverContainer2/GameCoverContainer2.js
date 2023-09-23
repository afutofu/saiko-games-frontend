import React from "react";

import GameCoverDisplay2 from "../GameCoverDisplay2/GameCoverDisplay2";

import styles from "./GameCoverContainer2.module.css";

const GameCoverDisplay2Container = (props) => {
  const onGameClick = (gameId) => {
    props.onGameClick(gameId);
  };

  const renderGames = () => {
    let games = [];

    props.games.forEach((game) => {
      let genres = [];
      if (genres === undefined) {
        game.genres.forEach((genre) => {
          genres.push(genre.name);
        });
      } else {
        genres.push("");
      }

      let cover = null;

      if (game.cover) {
        cover = "https:" + game.cover.url.replace("t_thumb", "t_cover_big");
      }

      games.push(
        <div key={game.id} className={styles.game}>
          <GameCoverDisplay2
            key={game.id}
            onGameClick={onGameClick}
            gameId={game.id}
            cover={cover}
            name={game.name}
            genres={genres}
            storyline={game.storyline ? game.storyline : game.summary}
            summary={game.summary ? game.summary : game.summary}
            rating={Math.round(game.total_rating)}
          />
        </div>
      );
    });

    return games;
  };

  return (
    <div className={styles.gameCoverDisplay2Container}>{renderGames()}</div>
  );
};

export default GameCoverDisplay2Container;
