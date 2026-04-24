import { useAppSelector } from "../../hooks/storeHooks";
import AddFilmButtonSection from "../AddFilmButtonSection/AddFilmButtonSection";
import SortingSection from "../SortingSection/SortingSection";
import styles from "./ControleSection.module.css";

const ControlSection = () => {
  const { filmStatistic, serverError } = useAppSelector((store) => store.main);
  if (serverError) return null;
  return (
    <section
      className={`${!filmStatistic.total ? styles.skeleton : ""} ${styles.container}`}
    >
      {filmStatistic.total && <SortingSection />}
      {filmStatistic.total && <AddFilmButtonSection />}
    </section>
  );
};

export default ControlSection;
