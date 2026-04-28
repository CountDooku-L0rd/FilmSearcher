import { useAppSelector } from "../../hooks/storeHooks";
import AddFilmButton from "../AddFilmButton/AddFilmButton";
import FilterAndSortControlPanel from "../FilterAndSortControlPanel/FilterAndSortControlPanel";
import styles from "./ControlSection.module.css";

const ControlSection = () => {
  const { filmStatistic, serverError } = useAppSelector((store) => store.main);
  if (serverError) return null;
  return (
    <section
      className={`${!filmStatistic.total ? styles.skeleton : ""} ${styles.container}`}
    >
      {filmStatistic.total && <FilterAndSortControlPanel />}
      {filmStatistic.total && (
        <AddFilmButton/>
      )}
    </section>
  );
};

export default ControlSection;
