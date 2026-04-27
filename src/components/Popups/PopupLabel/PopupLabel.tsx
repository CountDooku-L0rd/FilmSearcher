import styles from "./PopupLabel.module.css";
import type { PopupLabelTypes } from "./types/PopupLabelTypes";

const PopupLabel = ({
  value,
  title,
  onChange,
  error = null,
  placeholder,
  style,
}: PopupLabelTypes) => {
  return (
    <label className={styles.label}>
      <p className={styles.input_title}>{title}</p>
      <input value={value} className={styles.input} style={{...style}} type="text" onChange={onChange} placeholder={placeholder}/>
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
};

export default PopupLabel;
