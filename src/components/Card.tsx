import styles from "./card.module.css";

interface CardProps {
  header: string;
  text: string;
  Icon: React.ComponentType;
}

function Card({ header, text, Icon }: CardProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardInfo}>
        <div className={styles.iconWrapper}>
          <Icon />
        </div>
        <h3>{header}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export { Card };
