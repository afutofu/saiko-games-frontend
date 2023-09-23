import React, { useState, useEffect } from "react";

import axios from "axios";

import styles from "./Review.module.css";

const reviewList = [
  "Good game!",
  "Not bad at all.",
  "Would play it again.",
  "Already one of my favorites.",
  "Awesome, I wonder if there will be a sequel.",
  "Love it!",
  "Recommended it to everyone in my workplace.",
  "Insanely addicting. Send help hahaha",
  "The world feels super immersive.",
  "10/10 would play again.",
  "A solid 8/10 for me",
  "Now this is my type of game",
  "Could be better.",
  "Complete waste of my time :(",
  "Thumbs down, not worth the time.",
  "If anyone is thinking of buying this game. Dont.",
  "Waited years for a month old game",
  "Dissapointing",
  "It wasnt forgettable, now I got something to talk about.",
];
const Review = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/")
      .then((res) => {
        const person = res.data.results[0];
        setName(person.name.first + " " + person.name.last);
        setImage(person.picture.thumbnail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.review}>
      <div className={styles.info}>
        <img src={image} alt="" className={styles.picture} />
        <h3 className={styles.username}>{name}</h3>
      </div>
      <p className={styles.userReview}>
        {reviewList[Math.round(Math.random() * (reviewList.length - 1))]}
      </p>
    </div>
  );
};

export default Review;
