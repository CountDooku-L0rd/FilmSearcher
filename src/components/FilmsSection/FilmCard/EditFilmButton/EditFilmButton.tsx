import type { FilmsAPI } from "@yp-mentor/films-server-types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHooks";
import {
  resetModal,
  setData,
  setIsEditModalOpen,
} from "../../../../store/modalSlice";
import styles from "./EditFilmButton.module.css";

const EditFilmButton = ({
  film,
}: {
  film: Awaited<ReturnType<FilmsAPI["getFilms"]>>["data"][number];
}) => {
  const { isServerRequest } = useAppSelector((store) => store.main);
  const dispatch = useAppDispatch();
  return (
    <button
      className={styles.button}
      onClick={() => {
        dispatch(resetModal());
        dispatch(setData(film));
        dispatch(setIsEditModalOpen(true));
      }}
      disabled={isServerRequest}
    />
  );
};

export default EditFilmButton;
