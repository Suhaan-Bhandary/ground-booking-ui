import styles from "./SlotsSkeletonLoader.module.css";

const SlotsSkeletonLoader = () => {
  return (
    <div className={`${styles.skeleton} ${styles.wrapper}`}>
      <div className={`${styles.time} ${styles.skeleton}`}></div>
      <div className={`${styles.status} ${styles.skeleton}`}></div>
      <div className={`${styles.button} ${styles.skeleton}`}></div>
    </div>
  );
};

export default SlotsSkeletonLoader;
