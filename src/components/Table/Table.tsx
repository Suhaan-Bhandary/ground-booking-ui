import React from "react";
import styles from "./Table.module.css";

type TableProps = {
  className: string;
  children: React.ReactNode;
  isDarkMode?: boolean;
};

const Table = ({ className, children, isDarkMode = false }: TableProps) => {
  return (
    <table
      className={`${styles.table} ${className} ${isDarkMode ? "" : styles.whiteMode}`}
    >
      {children}
    </table>
  );
};

Table.defaultProps = {
  className: "",
};

export default Table;
