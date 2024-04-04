import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <section className={styles.footer}>
        <div className="container">
          <div className={styles.footerContainer}>
            <div className={styles.info}>
              <h2>Ground booking</h2>
              <p>
                Book ground to play cricket, badminton and other games with your
                friends in just one click!!
              </p>
            </div>

            <div className={styles.links}>
              <h2>Links</h2>
              <a href="mailto:ground-booking@gmail.com">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.copyRight}>
        <div className="container">
          <p>Ground booking</p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
