import {type ChangeEvent, useState} from "react";
import styles from "./SearchInput.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks.ts";
import {setSearchString} from "../../../store/filterSlice.ts";

const SearchInput = () => {
  const dispatch = useAppDispatch()
  const {searchString} = useAppSelector(store => store.filter);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClick = () => {
    setIsEmpty(true);
    dispatch(setSearchString(""));
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    dispatch(setSearchString(event.target.value));
  };
  return (
    <div className={styles.label}>
      <input
        value={searchString}
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
