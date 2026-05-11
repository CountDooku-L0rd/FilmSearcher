import styles from "./CustomInput.module.css";
import type { CustomInputTypes } from "../../../types/CustomInputTypes";

const CustomInput = ({
  title,
  error = null,
  ...props
}: CustomInputTypes) => {
  return (
    <label className={styles.label}>
      <p className={styles.input_title}>{title}</p>
      <input
        className={styles.input}
        type="text"
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
};

export default CustomInput;
