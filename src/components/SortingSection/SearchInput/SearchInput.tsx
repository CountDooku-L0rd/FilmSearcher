import { type ChangeEvent, useRef, useState } from "react";
import styles from "./SearchInput.module.css";
import { useAppDispatch } from "../../../hooks/storeHooks.ts";
import { setSearchString } from "../../../store/filterSlice.ts";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const timeoutRef = useRef<number|null>(null)

  const handleClick = () => {
    setIsEmpty(true);
    dispatch(setSearchString(""));
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current){
      clearTimeout(timeoutRef.current)
    }
    if (event.target.value !== "") {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    setValue(event.target.value);
    timeoutRef.current = setTimeout(() => {dispatch(setSearchString(event.target.value))}, 1000)
  };
  return (
    <div className={styles.label}>
      <input
        value={value}
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
