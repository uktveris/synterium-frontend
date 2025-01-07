import styles from "./hero.module.css";

function Hero() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.columnContainer}>
        <div className={styles.leftColumn}>
          <h1>The Ultimate Cloud Storage Solution.</h1>
        </div>
        <div className={styles.rightColumn}>
          <img
            src="../../assets/computer-uploading-files.png"
            className={styles.heroImage}
          />
          <div className={styles.shape}></div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
