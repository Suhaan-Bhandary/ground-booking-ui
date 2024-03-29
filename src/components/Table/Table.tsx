import React from "react";
import styles from "./Table.module.css";

type TableProps = {
  className: string;
  children: React.ReactNode;
};

const Table = ({ className, children }: TableProps) => {
  return <table className={`${styles.table} ${className}`}>{children}</table>;
};

Table.defaultProps = {
  className: "",
};

export default Table;
