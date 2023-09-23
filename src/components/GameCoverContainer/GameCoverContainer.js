import React from "react";

import GameCoverDisplay from "../GameCoverDisplay/GameCoverDisplay";

import noCover from "../../assets/images/noCover.jpg";

import styles from "./GameCoverContainer.module.css";

const GameCoverContainer = (props) => {
  const getGames = () => {
    let games = [];

    props.games.forEach((game) => {
      games.push(
        <GameCoverDisplay
          key={game.id}
          gameId={game.id}
          cover={
            game.cover && game.cover !== null
              ? "https:" + game.cover.url.replace("t_thumb", "t_cover_big")
              : noCover
          }
          name={game.name}
          genre={game.genres ? game.genres[0].name : null}
          rating={game.total_rating ? Math.round(game.total_rating) : null}
        />
      );
    });

    return games;
  };

  return <div className={styles.gameCoverContainer}>{getGames()}</div>;
};

export default GameCoverContainer;
