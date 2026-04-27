import type { ChangeEvent } from "react";
import styles from "./PopupTextarea.module.css";

const PopupTextarea = ({
  value,
  title,
  onChange,
}: {
  value: string;
  title: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <label className={styles.label}>
      <p className={styles.input_title}>{title}</p>
      <textarea value={value} className={styles.textarea} onChange={onChange} />
    </label>
  );
};

export default PopupTextarea;
