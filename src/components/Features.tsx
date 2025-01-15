import { useEffect, useState } from "react";
import styles from "./features.module.css";
import { Card } from "./Card";
import { useSwipeable } from "react-swipeable";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";

const cards = [
  {
    title: "card1",
    icon: IoFileTrayStackedSharp,
  },
  {
    title: "card2",
    icon: FaBoltLightning,
  },
  {
    title: "card3",
    icon: FaCloudDownloadAlt,
  },
  {
    title: "card4",
    icon: CiMobile1,
  },
  {
    title: "card5",
    icon: FaUserFriends,
  },
];

function Features() {
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
    setLength(cards.length);
  }, [cards]);

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
        {cards.map((card, index) => (
          <Card key={index} header={card.title} text={text} Icon={card.icon} />
        ))}
      </div>
    </div>
  );
}

export { Features };
