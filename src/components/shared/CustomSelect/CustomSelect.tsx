import styles from "./CustomSelect.module.css";
import type { CustomSelectTypes } from "../../../types/CustomSelectTypes.ts";
import { useClickOutside } from "../../../hooks/useClickOutside.ts";
import { useState } from "react";

const CustomSelect = <T,>({
  options,
  value,
  onChange,
  title,
  style,
}: CustomSelectTypes<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleTriggerClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleCustomSelect = (option: { value: T; label: string }) => {
    onChange(option);
    setIsOpen(false);
  };
  return (
    <div ref={ref} className={styles.container}>
      <p className={styles.text}>{title}</p>
      <div
        className={styles.selector_input}
        onClick={handleTriggerClick}
        style={{ ...style }}
      >
        <span>{value.label}</span>
        <span
          className={`${styles.selector_input_svg} ${isOpen ? styles.svg_reverse : ""}`}
        ></span>
      </div>
      {isOpen && (
        <ul className={styles.selector_list}>
          {options.map((option) => (
            <li
              className={`${styles.selector_elem} ${value.label === option.label ? styles.selector_elem_active : false}`}
              onClick={() => handleCustomSelect(option)}
              key={"option_" + option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
