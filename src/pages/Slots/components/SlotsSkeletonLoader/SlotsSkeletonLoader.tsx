import styles from "./SlotsSkeletonLoader.module.css";

type SlotsSkeletonLoaderProps = {
  slotCount: number;
};

const SlotsSkeletonLoader = ({ slotCount }: SlotsSkeletonLoaderProps) => {
  return (
    <>
      {[...Array(slotCount)].map((_, index) => (
        <div key={index} className={`${styles.skeleton} ${styles.wrapper}`}>
          <div className={`${styles.time} ${styles.skeleton}`}></div>
          <div className={`${styles.status} ${styles.skeleton}`}></div>
          <div className={`${styles.button} ${styles.skeleton}`}></div>
        </div>
      ))}
    </>
  );
};

export default SlotsSkeletonLoader;
