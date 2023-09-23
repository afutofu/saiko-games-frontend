import React, { useState, useEffect } from "react";
import axios from "axios";

import SectionTitle from "../../components/SectionTitle/SectionTitle";
import FeaturedGame from "../../components/FeaturedGame/FeaturedGame";
import GameCoverContainer from "../../components/GameCoverContainer/GameCoverContainer";
import TrendingGamesContainer from "../../container/TrendingGamesContainer/TrendingGamesContainer";
import VideoContainer from "../../container/VideoContainer/VideoContainer";
import GameScreenshotContainer from "../../components/GameScreenshotContainer/GameScreenshotContainer";
import Spinner from "../../components/Spinner/Spinner";

import defaultBackground from "../../assets/images/defaultBackground.jpg";

import styles from "./FrontPage.module.css";

let loadCount = 0;

const FrontPage = () => {
  const toBeLoaded = 1;
  const [background, setBackground] = useState(null);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [latestReleases, setLatestReleases] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [topPastYear, setTopPastYear] = useState([]);
  const [topPast5Years, setTopPast5Years] = useState([]);
  const [topAllTime, setTopAllTime] = useState([]);

  useEffect(() => {
    getGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    loadCount += 1;
    return res.data;
  };

  const getGames = () => {
    // Getting featured games for trailing 6 months
    let body = `fields name, genres.name, cover.url, storyline, summary, screenshots.url, artworks.url, videos.name, videos.video_id; sort popularity desc; where total_rating > 89 & category = 0 & first_release_date > ${
      Math.floor(Date.now() / 1000) - 15778800
    } & first_release_date < ${Math.floor(Date.now() / 1000)}; limit 5;`;

    fetchData(body)
      .then((data) => {
        let background = getBackgroundLink(data[0]);
        setBackground(background);
        setFeaturedGames(data);
      })
      .catch((err) => console.log(err));

    // Getting latest games between now and one month ago
    body = `fields name, genres.name, cover.url, total_rating; sort first_release_date desc;where category = 0 & first_release_date > ${
      Math.floor(Date.now() / 1000) - 2629800
    } & first_release_date < ${Math.floor(Date.now() / 1000)}; limit 10;`;

    fetchData(body)
      .then((data) => {
        setLatestReleases(data);
      })
      .catch((err) => console.log(err));

    // Get data for trending games from trailing 2 months
    body = `fields name, genres.name, cover.url, screenshots.url, total_rating, storyline, summary; sort popularity desc; where category = 0 & first_release_date > ${
      Math.floor(Date.now() / 1000) - 5259600
    } & first_release_date < ${Math.floor(Date.now() / 1000)}; limit 4;`;

    fetchData(body)
      .then((data) => {
        setTrendingGames(data);
      })
      .catch((err) => console.log(err));

    // Get data for highest rated games for the past year
    body = `fields name, genres.name, screenshots.url, total_rating; sort total_rating desc; where total_rating > 50 & category = 0 & first_release_date > ${
      Math.floor(Date.now() / 1000) - 31557600
    } & first_release_date < ${Math.floor(Date.now() / 1000)}; limit 3;`;

    fetchData(body)
      .then((data) => {
        setTopPastYear(data);
      })
      .catch((err) => console.log(err));

    // Get data for highest rated games for the past 5 years
    body = `fields name, genres.name, screenshots.url, total_rating; sort total_rating desc; where total_rating > 50 & total_rating_count > 25 & category = 0 & first_release_date > ${
      Math.floor(Date.now() / 1000) - 157788000
    } & first_release_date < ${Math.floor(Date.now() / 1000)}; limit 3;`;

    fetchData(body)
      .then((data) => {
        setTopPast5Years(data);
      })
      .catch((err) => console.log(err));

    // Get data for highest rated games of all time
    body = `fields name, genres.name, screenshots.url, total_rating, total_rating_count; sort total_rating desc; where total_rating > 50 & total_rating_count >= 50 & category = 0 & first_release_date < ${Math.floor(
      Date.now() / 1000
    )}; limit 3;`;

    fetchData(body)
      .then((data) => {
        setTopAllTime(data);
      })
      .catch((err) => console.log(err));
  };

  const renderContent = () => {
    // If all items not loaded, display spinner
    if (loadCount < toBeLoaded) {
      loadCount = 0;
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
      <div className={styles.frontPage}>
        {featuredGames.length > 0 ? (
          <img
            className={styles.backgroundImage}
            src={background}
            alt="No background available"
          />
        ) : (
          <img
            className={styles.backgroundImage}
            src={defaultBackground}
            alt="No background available"
          />
        )}

        <div className={styles.background} />
        <div className={styles.container}>
          <SectionTitle title="featured" />
          {featuredGames.length > 0 ? (
            <FeaturedGame game={featuredGames[0]} />
          ) : null}

          <SectionTitle title="latest releases" />
          {latestReleases.length > 0 ? (
            <GameCoverContainer games={latestReleases} />
          ) : null}
          <SectionTitle title="trending" />
          {trendingGames.length > 0 ? (
            <TrendingGamesContainer games={trendingGames} />
          ) : null}
        </div>
        {featuredGames.length > 0 ? (
          <VideoContainer games={featuredGames} />
        ) : null}

        <div className={styles.container}>
          <SectionTitle title="highest rated games" big />
          <SectionTitle title="past year" color="#DED375" />
          <GameScreenshotContainer games={topPastYear} />
          <SectionTitle title="past 5 years" color="#DED375" />
          <GameScreenshotContainer games={topPast5Years} />
          <SectionTitle title="all time" color="#DED375" />
          <GameScreenshotContainer games={topAllTime} />
        </div>
      </div>
    );
  };

  return renderContent();
};

export default FrontPage;
