import styles from "./FilterAndSortControlPanel.module.css";
import FilterButton from "./FilterButton/FilterButton.tsx";
import SearchBar from "./SearchBar/SearchBar.tsx";
import SortButton from "./SortButton/SortButton.tsx";

const FilterAndSortControlPanel = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <SearchBar />
        </li>
        <li>
          <div className={styles.buttons}>
            <FilterButton />
            <SortButton />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FilterAndSortControlPanel;
