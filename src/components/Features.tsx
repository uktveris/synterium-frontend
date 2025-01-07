import { useEffect, useState } from "react";
import styles from "./features.module.css";
import { Card } from "./Card";
import { useSwipeable } from "react-swipeable";

function Features() {
  const items = ["card1", "card2", "card3", "card4", "card5", "card6"];
  const show = 2;

  const [currIndex, setCurrIndex] = useState(0);
  const [length, setLength] = useState(0);

  const text =
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Hendrerit venenatis torquent pulvinar augue sodales rutrum. Natoque curabitur fusce, mattis turpis eu viverra quis. Bibendum rhoncus consequat natoque et amet. Commodo integer mi ut donec convallis. Ipsum sociosqu libero lectus nunc sit etiam nulla. Magnis fringilla platea habitasse amet elit.";

  const handlers = useSwipeable({
    onSwipedLeft: () => goForward(),
    onSwipedRight: () => goBack(),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  useEffect(() => {
    setLength(items.length);
  }, [items]);

  console.log("current index: " + currIndex);

  const goBack = () => {
    if (currIndex > 0) {
      setCurrIndex((index) => index - 1);
    }
  };

  const goForward = () => {
    if (currIndex < length - show) {
      setCurrIndex((index) => index + 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Features</h1>
      <div className={styles.buttonsContainer}>
        <button onClick={goBack}>&#60;</button>
        <button onClick={goForward}>&#62;</button>
      </div>
      <div
        className={styles.carousel}
        {...handlers}
        style={{
          transform: `translateX(-${(currIndex * 100) / show}%)`,
        }}
      >
        {items.map((item) => (
          <Card header={item} text={text} />
        ))}
      </div>
    </div>
  );
}

export { Features };
