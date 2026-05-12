import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHooks";
import { useGetFilms } from "../../../../hooks/useGetFilms";
import { useDeleteFilmMutation } from "../../../../store/api/filmsApi/filmsApi";
import { setIsServerRequest, setIsUpdating } from "../../../../store/mainSlice";
import { showSuccessToast } from "../../../../toasts/toasts";
import styles from "./DeleteFilmButton.module.css";

const DeleteFilmButton = ({ filmId }: { filmId: number }) => {
  const { isServerRequest } = useAppSelector((store) => store.main);
  const dispatch = useAppDispatch();
  const { getFilms } = useGetFilms();
  const [deleteFilmTrigger] = useDeleteFilmMutation();
  const handleDeleteClick = (id: number) => {
    dispatch(setIsServerRequest(true));
    dispatch(setIsUpdating(true));
    deleteFilmTrigger({ id: id.toString() })
      .then(() => {
        showSuccessToast("Фильм успешно удалён");
        getFilms();
      })
      .finally(() => {
        dispatch(setIsServerRequest(false));
        dispatch(setIsUpdating(false));
      });
  };
  return (
    <button
      className={styles.button}
      onClick={() => handleDeleteClick(filmId)}
      disabled={isServerRequest}
    />
  );
};

export default DeleteFilmButton;
