import styles from "./SortButton.module.css";
import { useAppDispatch } from "../../../hooks/storeHooks.ts";
import { toggleSortOpen } from "../../../store/sortSlice.ts";

const SortButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={styles.button}
      onClick={() => {
        dispatch(toggleSortOpen());
      }}
    >
      <span className={styles.sort_button}></span>
      Сортировка
    </button>
  );
};

export default SortButton;
