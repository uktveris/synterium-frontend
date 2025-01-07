import styles from "./card.module.css";

interface CardProps {
  header: string;
  text: string;
}

function Card({ header, text }: CardProps) {
  return (
    <div
      className={styles.mainContainer}
      // style={{ translate: `-${index * 100}%` }}
    >
      <div className={styles.cardInfo}>
        <h3>{header}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export { Card };
