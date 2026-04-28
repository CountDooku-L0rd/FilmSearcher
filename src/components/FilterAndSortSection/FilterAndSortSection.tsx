import styles from "./FilterAndSortSection.module.css";
import { useAppSelector } from "../../hooks/storeHooks.ts";
import SortPanel from "./SortPanel/SortPanel.tsx";
import FilterPanel from "./FilterPanel/FilterPanel.tsx";

const FilterAndSortSection = () => {
  const { isSortOpen, isFilterOpen } = useAppSelector((store) => store.sort);
  
  return (
    <>
      {(isSortOpen || isFilterOpen) && (
        <section className={styles.section}>
          {isSortOpen && <SortPanel />}
          {isFilterOpen && <FilterPanel />}
        </section>
      )}
    </>
  );
};

export default FilterAndSortSection;
