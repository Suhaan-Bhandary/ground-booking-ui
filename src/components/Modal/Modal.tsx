import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  isDarkMode?: boolean;
};

function Modal({ children, isDarkMode = true }: ModalProps) {
  return (
    <div className={`${styles.Modal} ${isDarkMode ? styles.darkMode : ""}`}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Modal;
