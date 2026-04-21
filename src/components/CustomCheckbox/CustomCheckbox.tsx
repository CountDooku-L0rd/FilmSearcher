import styles from "./CustomCheckbox.module.css";

const CustomCheckbox = <T,>({
  value,
  isChecked,
  onChange,
}: {
  value: { value: T; label: string };
  isChecked: boolean;
  onChange: (value: T, checked: boolean) => void;
}) => {
  return (
    <li>
      <label className={`${styles.custom_checkbox}`}>
        <input checked={isChecked} className={styles.checkbox} type="checkbox" onChange={(e) => {onChange(value.value, e.target.checked)}}/>
        <span className={styles.custom_checkmark}></span>
        {value.label}
      </label>
    </li>
  );
};

export default CustomCheckbox;
