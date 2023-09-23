import React from "react";

import styles from "./SectionTitle.module.css";

const SectionTitle = (props) => {
  return (
    <div className={styles.sectionTitle}>
      {props.big ? (
        <p className={styles.bigTitle}>{props.title}</p>
      ) : (
        <p className={styles.title}>{props.title}</p>
      )}

      <div
        className={styles.borderBottom}
        style={{ background: props.color }}
      />
    </div>
  );
};

export default SectionTitle;
