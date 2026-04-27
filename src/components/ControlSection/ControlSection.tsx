import { EStatus } from "@yp-mentor/films-server-types";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setData, setErrors, setIsAddModalOpen } from "../../store/modalSlice";
import AddFilmButton from "../AddFilmButton/AddFilmButton";
import SortingSection from "../SortingSection/SortingSection";
import styles from "./ControleSection.module.css";

const ControlSection = () => {
  const dispatch = useAppDispatch();
  const { filmStatistic, serverError } = useAppSelector((store) => store.main);
  if (serverError) return null;
  return (
    <section
      className={`${!filmStatistic.total ? styles.skeleton : ""} ${styles.container}`}
    >
      {filmStatistic.total && <SortingSection />}
      {filmStatistic.total && (
        <AddFilmButton
          onClick={() => {
            dispatch(setIsAddModalOpen(true));
            dispatch(
              setData({
                id: -1,
                createdAt: "",
                director: "",
                genres: [],
                rating: 0,
                status: EStatus.in_plans,
                title: "",
                year: 0,
              }),
              dispatch(
                setErrors({
                  title: "",
                  director: "",
                  genres: "",
                  rating: "",
                  year: "",
                }),
              ),
            );
          }}
        />
      )}
    </section>
  );
};

export default ControlSection;
