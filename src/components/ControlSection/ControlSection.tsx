import { useAppSelector } from "../../hooks/storeHooks";
import { useGetFilmsWithSync } from "../../hooks/useGetFilmsWithSync";
import AddFilmButton from "../AddFilmButton/AddFilmButton";
import FilterAndSortControlPanel from "../FilterAndSortControlPanel/FilterAndSortControlPanel";
import styles from "./ControlSection.module.css";

const ControlSection = () => {
  const { filmStatistic } = useAppSelector((store) => store.main);
  const {error} = useGetFilmsWithSync();
  if (error) return null;
  return (
    <section
      className={`${!filmStatistic.total ? styles.skeleton : ""} ${styles.container}`}
    >
      {filmStatistic.total && <FilterAndSortControlPanel />}
      {filmStatistic.total && <AddFilmButton />}
    </section>
  );
};

export default ControlSection;
