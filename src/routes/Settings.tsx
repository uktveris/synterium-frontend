import Header from "../components/Header";

function Settings() {
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <h1>The settings page here</h1>
        <p>Some settings to play aroud here</p>
      </div>
    </div>
  );
}

export { Settings };
