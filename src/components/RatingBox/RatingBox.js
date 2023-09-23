import React, { useState, useEffect } from "react";

import styles from "./RatingBox.module.css";

const RatingBox = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const percentageToColor = (perc) => {
    let r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  };

  const renderContent = () => {
    let ratingStyles = [styles.rating];
    let ratingBarStyles = [styles.ratingBar];

    if (mounted) {
      switch (props.delay) {
        case 1:
          ratingStyles.push(styles.fadeIn1);
          ratingBarStyles.push(styles.slideIn1);
          break;
        case 2:
          ratingStyles.push(styles.fadeIn2);
          ratingBarStyles.push(styles.slideIn2);
          break;
        case 3:
          ratingStyles.push(styles.fadeIn3);
          ratingBarStyles.push(styles.slideIn3);
          break;
        default:
          return null;
      }
    }

    return (
      <div className={styles.ratingBox}>
        <p className={styles.title}>{props.title}</p>
        <p className={ratingStyles.join(" ")}>{props.rating}</p>
        <div
          className={ratingBarStyles.join(" ")}
          style={{
            width: `${props.rating}%`,
            background: `${percentageToColor(props.rating)}`,
          }}
        />
      </div>
    );
  };

  return renderContent();
};

export default RatingBox;
