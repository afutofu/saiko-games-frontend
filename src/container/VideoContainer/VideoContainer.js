import React, { useState } from "react";

import styles from "./VideoContainer.module.css";

const VideosContainer = (props) => {
  const media = [];

  if (props.gamePage) {
    // If video container is used in game page
    for (let i = 0; i < props.gameInfo.videos.length; i++) {
      const video = props.gameInfo.videos[i];
      media.push(
        <iframe
          index={i}
          title={video.name}
          key={video.id}
          className={styles.video}
          src={`https://www.youtube.com/embed/${video.video_id}`}
        ></iframe>
      );
    }

    let mediaLength = media.length;

    for (
      let i = mediaLength;
      i - mediaLength < props.gameInfo.screenshots.length;
      i++
    ) {
      const screenshot = props.gameInfo.screenshots[i - mediaLength];
      media.push(
        <img
          index={i}
          key={screenshot.id}
          className={styles.video}
          alt="Screenshot failed to load"
          src={"https:" + screenshot.url.replace("t_thumb", "t_1080p")}
        />
      );
    }

    mediaLength = media.length;
    if (props.gameInfo.artworks) {
      for (
        let i = mediaLength;
        i - mediaLength < props.gameInfo.artworks.length;
        i++
      ) {
        const artwork = props.gameInfo.artworks[i - mediaLength];
        media.push(
          <img
            index={i}
            key={artwork.id}
            className={styles.video}
            alt="Artwork failed to load"
            src={"https:" + artwork.url.replace("t_thumb", "t_1080p")}
          />
        );
      }
    }
  } else {
    // If used in front page
    let id = 0;
    props.games.forEach((game) => {
      if (game.videos) {
        media.push(
          <iframe
            index={id}
            title={game.videos.id}
            key={id}
            className={styles.video}
            src={`https://www.youtube.com/embed/${game.videos[0].video_id}`}
          ></iframe>
        );
        id = id + 1;
      }
    });
  }

  const [mediaItem, setMediaItem] = useState(media[0]);

  const onNextVideo = () => {
    const newIndex = mediaItem.props.index + 1;
    setMediaItem(media[newIndex]);
  };

  const onPrevVideo = () => {
    const newIndex = mediaItem.props.index - 1;
    setMediaItem(media[newIndex]);
  };

  const renderContent = () => {
    return (
      <div className={styles.videosContainer}>
        <div className={styles.buttons}>
          {mediaItem.props.index === 0 ? (
            <div />
          ) : (
            <button onClick={onPrevVideo} className={styles.prevButton}>
              <i className="fa fa-chevron-left"></i>
            </button>
          )}
          {mediaItem.props.index === media.length - 1 ? (
            <div />
          ) : (
            <button onClick={onNextVideo} className={styles.nextButton}>
              <i className="fa fa-chevron-right"></i>
            </button>
          )}
        </div>
        <div
          className={styles.slider}
          style={{
            transform: `translateX(-${mediaItem.props.index * 100}%)`,
          }}
        >
          {media}
        </div>
      </div>
    );
  };

  return renderContent();
};

export default VideosContainer;
