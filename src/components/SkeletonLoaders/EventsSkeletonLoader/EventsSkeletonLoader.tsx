import styles from "./EventsSkeletonLoader.module.css";

const EventsSkeletonLoader = () => {
  return (
    <div className={`${styles.skeleton} ${styles.wrapper}`}>
      <div className={`${styles.time} ${styles.skeleton}`}></div>
      <div className={`${styles.ago} ${styles.skeleton}`}></div>
      <div className={`${styles.status} ${styles.skeleton}`}></div>
      <div className={`${styles.button} ${styles.skeleton}`}></div>
    </div>
  );
};

export default EventsSkeletonLoader;
