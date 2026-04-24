import styles from "./SortingSection.module.css";
import SearchInput from "./SearchInput/SearchInput.tsx";
import SortButton from "./SortButton/SortButton.tsx";

const SortingSection = () => {
  return (
    <section>
      <ul className={styles.list}>
        <li>
          <SearchInput />
        </li>
        <li>
          <div className={styles.buttons}>
            <SortButton buttonType={"filters"} />
            <SortButton buttonType={"sort"} />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default SortingSection;
