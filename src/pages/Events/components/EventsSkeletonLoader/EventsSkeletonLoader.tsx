import styles from "./EventsSkeletonLoader.module.css";

type EventsSkeletonLoaderProps = {
  eventCount: number;
};

const EventsSkeletonLoader = ({ eventCount }: EventsSkeletonLoaderProps) => {
  return (
    <>
      {[...Array(eventCount)].map((_, index) => (
        <div key={index} className={`${styles.skeleton} ${styles.wrapper}`}>
          <div className={`${styles.time} ${styles.skeleton}`}></div>
          <div className={`${styles.ago} ${styles.skeleton}`}></div>
          <div className={`${styles.status} ${styles.skeleton}`}></div>
          <div className={`${styles.button} ${styles.skeleton}`}></div>
        </div>
      ))}
    </>
  );
};

export default EventsSkeletonLoader;
