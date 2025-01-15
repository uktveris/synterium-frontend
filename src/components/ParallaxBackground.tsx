import { useEffect } from "react";
import styles from "./parallaxBackground.module.css";

function ParallaxBackground() {
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const scroll = window.scrollY;
          const circles = document.querySelectorAll(`.${styles.circle}`);
          circles.forEach((circle, index) => {
            const translateY = scroll * 0.2;
            (circle as HTMLElement).style.transform =
              `translateY(-${translateY}px)`;
          });
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.circle} style={{ top: "10%", left: "20%" }}></div>
      <div className={styles.circle} style={{ top: "30%", left: "60%" }}></div>
      <div className={styles.circle} style={{ top: "70%", left: "40%" }}></div>
    </div>
  );
}

export { ParallaxBackground };
