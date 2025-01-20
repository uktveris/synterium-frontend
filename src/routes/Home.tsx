import useAuth from "../hooks/useAuth";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import styles from "./home.module.css";
import Header from "../components/Header";
import { MobilePromo } from "../components/MobilePromo";
import { ParallaxBackground } from "../components/ParallaxBackground";

function Home() {
  const { authed } = useAuth();
  console.log("authed value is: " + authed);

  return (
    <div className={styles.mainContainer}>
      <ParallaxBackground />
      <Header />
      <Hero />
      <Features />
      <MobilePromo />
    </div>
  );
}

export { Home };
