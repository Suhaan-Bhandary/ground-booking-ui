import styles from "./DarkTableRowSkeletonLoader.module.css";

type DarkTableRowSkeletonLoaderProps = {
  cols: number;
};

const DarkTableRowSkeletonLoader = ({
  cols,
}: DarkTableRowSkeletonLoaderProps) => {
  return (
    <tr>
      {[...Array(cols)].map(() => (
        <td className={`${styles.skeleton} ${styles.wrapper}`}></td>
      ))}
    </tr>
  );
};

export default DarkTableRowSkeletonLoader;
