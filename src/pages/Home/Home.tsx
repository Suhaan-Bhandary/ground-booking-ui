import { Link } from "react-router-dom";
import sportsImage from "../../assets/sports.png";
import styles from "./Home.module.css";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="full-height">
      <main className="container">
        <section className={styles.banner}>
          <div className={styles.containerWrapper}>
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>Ground Booking App</h1>
              <p className={styles.bannerDetail}>
                Book ground to play cricket, badminton and other games with your
                friends in just one click!!
              </p>
              <Link to="/events" className={styles.bannerButton}>
                Events
              </Link>
            </div>
            <div className={styles.bannerImage}>
              <img src={sportsImage} alt="sports" width="432" height="432" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
