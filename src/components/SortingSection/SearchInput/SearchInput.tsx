import { type ChangeEvent, useMemo, useState } from "react";
import styles from "./SearchInput.module.css";
import { useAppDispatch } from "../../../hooks/storeHooks.ts";
import { setSearchString } from "../../../store/filterSlice.ts";
import { debounce } from "../../../utils/utils.ts";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const debouncedSearch = useMemo(() => debounce((searchValue: string) => {
    dispatch(setSearchString(searchValue));
  }, 1000), [dispatch]);

  const handleClick = () => {
    setIsEmpty(true);
    dispatch(setSearchString(""));
    setValue("");
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue !== "") {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    setValue(newValue);
    debouncedSearch(newValue);
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
