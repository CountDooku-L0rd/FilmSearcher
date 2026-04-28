import styles from "./CustomInput.module.css";
import type { CustomInputTypes } from "../../../types/CustomInputTypes";

const CustomInput = ({
  value,
  title,
  onChange,
  error = null,
  placeholder,
  style,
}: CustomInputTypes) => {
  return (
    <label className={styles.label}>
      <p className={styles.input_title}>{title}</p>
      <input
        value={value}
        className={styles.input}
        style={{ ...style }}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
};

export default CustomInput;
