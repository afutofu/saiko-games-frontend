import React, { useState } from "react";

import Review from "../../components/Review/Review";

import styles from "./ReviewContainer.module.css";

const ReviewContainer = (props) => {
  const [visibleReviews, setVisibleReviews] = useState(() => {
    let initialVisibleReviews = [];

    for (let i = 0; i < props.reviews; i++) {
      if (i === 5) {
        break;
      }
      initialVisibleReviews.push(<Review key={i} />);
    }

    return initialVisibleReviews;
  });

  const [reviewIndex, setReviewIndex] = useState(visibleReviews.length + 1);

  const onLoadMoreClick = () => {
    let newVisibleReviews = visibleReviews,
      newIndex = reviewIndex;

    for (newIndex; newIndex < reviewIndex + 5; newIndex++) {
      if (newIndex > props.reviews) {
        break;
      }
      newVisibleReviews.push(<Review key={newIndex} />);
    }

    setVisibleReviews(newVisibleReviews);
    setReviewIndex(newIndex);
  };

  const renderContent = () => {
    return (
      <div className={styles.reviewContainer}>
        <div className={styles.reviews}>{visibleReviews}</div>
        {props.reviews === 0 ? <p>No reviews</p> : null}
        {props.reviews > reviewIndex ? (
          <button className={styles.loadMoreButton} onClick={onLoadMoreClick}>
            Load More Reviews
          </button>
        ) : null}
      </div>
    );
  };

  return renderContent();
};

export default ReviewContainer;
