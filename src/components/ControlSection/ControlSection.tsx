import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/storeHooks";
import AddFilmButtonSection from "../AddFilmButtonSection/AddFilmButtonSection";
import SortingSection from "../SortingSection/SortingSection";
import styles from "./ControleSection.module.css";

const ControlSection = () => {
  const { films } = useAppSelector((store) => store.main);
  const isFirstLoading = useRef(true);
  useEffect(() => {
    if (films) {
      isFirstLoading.current = false;
    }
  }, [films]);
  return (
    <section className={`${isFirstLoading.current ? styles.sceleton : ""} ${styles.container}`}>
      {!isFirstLoading.current && <SortingSection />}
      {!isFirstLoading.current && <AddFilmButtonSection />}
    </section>
  );
};

export default ControlSection;
