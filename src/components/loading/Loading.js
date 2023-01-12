import React from "react";
import styles from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.wrapper}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
