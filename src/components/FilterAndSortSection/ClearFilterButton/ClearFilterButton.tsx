import { useAppDispatch } from "../../../hooks/storeHooks";
import { resetFilters } from "../../../store/filterSlice";
import styles from "./ClearFilterButton.module.css";

const ClearFilterButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={styles.button}
      onClick={() => {
        dispatch(resetFilters());
      }}
    >
      {"Сбросить фильтры"}
    </button>
  );
};

export default ClearFilterButton;
