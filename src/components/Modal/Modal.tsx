import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  return (
    <div className={styles.Modal}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Modal;
