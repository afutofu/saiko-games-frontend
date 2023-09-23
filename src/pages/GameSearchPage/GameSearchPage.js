import React, { useState, useEffect } from "react";
import axios from "axios";

import SectionTitle from "../../components/SectionTitle/SectionTitle";
import GameCoverDisplay2Container from "../../components/GameCoverContainer2/GameCoverContainer2";
import Spinner from "../../components/Spinner/Spinner";

import defaultBackground from "../../assets/images/defaultBackground.jpg";

import styles from "./GameSearchPage.module.css";

const GameSearchPage = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGames(props.location.state.searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.state.searchTerm]);

  const getBackgroundLink = (game) => {
    if (!game) {
      return defaultBackground;
    }

    if (
      game.screenshots &&
      game.screenshots != null &&
      game.screenshots.length > 1
    ) {
      return (
        "https:" +
        game.screenshots[
          Math.round(Math.random() * (game.screenshots.length - 1))
        ].url.replace("t_thumb", "t_1080p")
      );
    } else if (game.artworks && game.artworks !== null) {
      return (
        "https:" +
        game.artworks[
          Math.round(Math.random() * (game.artworks.length - 1))
        ].url.replace("t_thumb", "t_1080p")
      );
    } else {
      return defaultBackground;
    }
  };

  const fetchData = async (body) => {
    const url = `https://api.igdb.com/v4/games`;

    const res = await axios.post("/api/games", { url, body });
    return res.data;
  };

  const getGames = (searchTerm) => {
    const body = `search "${searchTerm}"; fields cover.url,name,genres.name,storyline, summary, total_rating, screenshots.url, artworks.url; where category=0; limit 50;`;

    fetchData(body)
      .then((data) => {
        let background = getBackgroundLink(data[0]);
        setBackground(background);
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderContent = () => {
    if (loading) {
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
    }

    return (
      <div className={styles.gameSearchPage}>
        {background ? (
          <img
            className={styles.backgroundImage}
            src={background}
            alt="No background found"
          />
        ) : (
          <img
            className={styles.backgroundImage}
            src={defaultBackground}
            alt="No background found"
          />
        )}

        <div className={styles.background} />
        <div className={styles.container}>
          <SectionTitle
            title={`games matched with "${props.location.state.searchTerm}"`}
          />

          {games ? (
            <GameCoverDisplay2Container games={games} />
          ) : (
            <p>No games found</p>
          )}
        </div>
      </div>
    );
  };

  return renderContent();
};

export default GameSearchPage;
