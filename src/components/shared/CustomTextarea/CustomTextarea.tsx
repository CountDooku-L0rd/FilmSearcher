import type { ChangeEvent } from "react";
import styles from "./CustomTextarea.module.css";

const CustomTextarea = ({
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

export default CustomTextarea;
