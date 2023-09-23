import React, { useState, useEffect } from "react";
import axios from "axios";

import GameFirstView from "../../container/GameFirstView/GameFirstView";
import VideoContainer from "../../container/VideoContainer/VideoContainer";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import GameCoverContainer from "../../components/GameCoverContainer/GameCoverContainer";
import GameDetails from "../../components/GameDetails/GameDetails";
import ReviewContainer from "../../container/ReviewContainer/ReviewContainer";
import Spinner from "../../components/Spinner/Spinner";

import defaultBackground from "../../assets/images/defaultBackground.jpg";

import styles from "./GamePage.module.css";

const GamePage = (props) => {
  const [loading, setLoading] = useState(true);
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGameInfo(props.match.params.gameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.gameId]);

  const getGameInfo = (gameId) => {
    const url = "https://api.igdb.com/v4/games";

    const body = `fields id,name,cover,cover.url, collection.name,genres.name, themes.name, first_release_date, storyline, summary, platforms.name, aggregated_rating, rating, rating_count, total_rating, screenshots.url, videos.video_id,involved_companies.*, involved_companies.company.name, game_engines.name, similar_games.name, similar_games.cover.url, similar_games.total_rating, similar_games.genres.name, websites.category, websites.url, game_modes.name, game_engines.name, franchise.name, release_dates.created_at, release_dates.platform.name, artworks.url; where id = ${gameId};`;

    axios
      .post("/api/games", { url, body })
      .then((res) => {
        setGameInfo(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderBackground = (gameInfo) => {
    if (!gameInfo) {
      return (
        <img
          className={styles.backgroundImage}
          src={defaultBackground}
          alt="No background found"
        />
      );
    }

    if (gameInfo.screenshots && gameInfo.screenshots !== null) {
      return (
        <img
          src={
            "https:" +
            gameInfo.screenshots[
              Math.round(Math.random() * (gameInfo.screenshots.length - 1))
            ].url.replace("t_thumb", "t_1080p")
          }
          alt="screenshot"
          className={styles.backgroundImage}
        />
      );
    } else if (gameInfo.artworks && gameInfo.artworks !== null) {
      return (
        <img
          src={
            "https:" +
            gameInfo.artworks[
              Math.round(Math.random() * (gameInfo.artworks.length - 1))
            ].url.replace("t_thumb", "t_1080p")
          }
          alt="screenshot"
          className={styles.backgroundImage}
        />
      );
    } else {
      return (
        <img
          className={styles.backgroundImage}
          src={defaultBackground}
          alt="No background found"
        />
      );
    }
  };

  const renderDefaultBackground = () => {
    return (
      <div style={{ height: "100vh" }}>
        <img
          className={styles.backgroundImage}
          src={defaultBackground}
          alt="No background available"
        />
        <Spinner />
        <div className={styles.background} />
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return renderDefaultBackground();
    }

    return (
      <div className={styles.gamePage}>
        {renderBackground(gameInfo)}
        <div className={styles.background} />

        <GameFirstView
          fromSearch={props.fromSearch}
          gameInfo={gameInfo}
          onBackToSearch={props.onBackToSearch}
        />

        {gameInfo.videos ? (
          <VideoContainer gameInfo={gameInfo} gamePage />
        ) : (
          <div style={{ height: "30vh" }} />
        )}

        <div className={styles.container}>
          {gameInfo.similar_games ? (
            <React.Fragment>
              <SectionTitle title="recommendations" />
              <GameCoverContainer
                games={
                  gameInfo.similar_games.length > 4
                    ? gameInfo.similar_games.slice(0, 4)
                    : gameInfo.similar_games
                }
              />
            </React.Fragment>
          ) : null}

          <div className={styles.reviewsDetails}>
            <div className={styles.reviews}>
              <SectionTitle
                title={
                  gameInfo.rating_count
                    ? gameInfo.rating_count > 1
                      ? `${gameInfo.rating_count} reviews`
                      : "1 review"
                    : "no reviews"
                }
              />
              <ReviewContainer reviews={gameInfo.rating_count} />
            </div>
            <div className={styles.details}>
              <SectionTitle title="details" />
              <GameDetails
                releaseDates={gameInfo.release_dates}
                gameModes={gameInfo.game_modes}
                franchise={
                  gameInfo.franchise && gameInfo.franchise !== null
                    ? gameInfo.franchise.name
                    : null
                }
                gameEngines={gameInfo.game_engines}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default GamePage;
