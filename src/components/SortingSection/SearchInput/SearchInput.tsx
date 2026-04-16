import { useState, type ChangeEventHandler } from "react";
import styles from "./SearchInput.module.css";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClick = () => {
    setIsEmpty(true);
    setInputValue("");
  };
  const handleChange = (event) => {
    if (event.target.value !== "") {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    setInputValue(event.target.value);
  };
  return (
    <div className={styles.label}>
      <input
        value={inputValue}
        className={styles.input}
        placeholder={"Поиск по названию, режиссеру или описанию"}
        onChange={handleChange}
      />
      {isEmpty ? (
        <div className={styles.search_svg}></div>
      ) : (
        <button className={styles.delete_svg} onClick={handleClick}></button>
      )}
    </div>
  );
};

export default SearchInput;
