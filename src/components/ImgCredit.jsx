import React from "react";
import styles from "./styles/img-credit.module.css";

function ImgCredit({ src, alt, children }) {
  return (
    <div className={styles.wrapper}>
      <h6 className={styles['image-credit']}>{children}</h6>
    </div>
  );
}

export default ImgCredit;