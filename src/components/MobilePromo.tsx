import { useState } from "react";
import styles from "./mobilePromo.module.css";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

function MobilePromo() {
  const text = `Lorem ipsum odor amet, consectetuer adipiscing elit. Litora class nisl taciti eu accumsan ad quis molestie. Dictum nostra turpis arcu conubia mollis mollis non. Tincidunt vivamus cursus vel enim ad; lacus vivamus. Leo ultricies per feugiat dui placerat hendrerit eu. Natoque fermentum imperdiet egestas vivamus libero. Tristique pharetra a congue magnis ex sodales tristique integer a. Conubia per nunc bibendum enim interdum natoque sem commodo.

  Iaculis tortor elementum vestibulum egestas conubia viverra non. Diam donec per per id natoque. Malesuada ullamcorper arcu tristique porta congue adipiscing pretium condimentum torquent. Arcu curae ex luctus fusce bibendum himenaeos aliquam quisque non. Fermentum scelerisque praesent non imperdiet, congue ad penatibus ultricies senectus. Metus nascetur maximus pretium maecenas tempus erat pretium quis natoque. Penatibus placerat ullamcorper aenean sapien volutpat vel maecenas. Blandit posuere metus tempor hendrerit non rutrum non dapibus. Imperdiet viverra nec taciti turpis consectetur volutpat sodales platea etiam.`;

  const [isVisible, setIsVisible] = useState(false);
  const { ref } = useInView({
    threshold: 0.4,
    onChange: (inView) => {
      setIsVisible(inView);
    },
  });

  return (
    <div ref={ref} className={styles.mainContainer}>
      <div
        className={`${styles.leftColumn} ${isVisible ? styles.visible : ""}`}
      >
        <div className={styles.appImageWrapper}>
          <img src="../../assets/app_logo.png" />
        </div>
      </div>
      <div
        className={`${styles.rightColumn} ${isVisible ? styles.visible : ""}`}
      >
        <h3>Try mobile app</h3>
        <p>{text}</p>
        <h4>Download on</h4>
        <ul className={styles.downloads}>
          <li>
            <span>
              <span className={styles.iconWrapper}>
                <FaGooglePlay />
              </span>
              Google Play
            </span>
          </li>
          <li>
            <span>
              <span className={styles.iconWrapper}>
                <FaAppStoreIos />
              </span>
              AppStore
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { MobilePromo };
