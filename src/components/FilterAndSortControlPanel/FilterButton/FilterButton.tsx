import styles from "./FilterButton.module.css";
import { useAppDispatch } from "../../../hooks/storeHooks.ts";
import { toggleFilterOpen } from "../../../store/sortSlice.ts";

const FilterButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={styles.button}
      onClick={() => {
        dispatch(toggleFilterOpen());
      }}
    >
      <span className={styles.filter_svg}></span>
      Фильтры
    </button>
  );
};

export default FilterButton;
