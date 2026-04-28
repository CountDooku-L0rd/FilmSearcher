import { filmService } from "../../../../api/FilmsService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHooks";
import { useGetFilms } from "../../../../hooks/useGetFilms";
import {
  setIsLoading,
  setIsServerRequest,
  setIsUpdating,
} from "../../../../store/mainSlice";
import { showErrorToast, showSuccessToast } from "../../../../toasts/toasts";
import styles from "./DeleteFilmButton.module.css";

const DeleteFilmButton = ({ filmId }: { filmId: number }) => {
  const { isServerRequest } = useAppSelector((store) => store.main);
  const dispatch = useAppDispatch();
  const { getFilms } = useGetFilms();
  const handleDeleteClick = async (id: number) => {
    try {
      dispatch(setIsServerRequest(true));
      dispatch(setIsLoading(true));
      dispatch(setIsUpdating(true));
      await filmService.deleteFilm({ id: id.toString() });
      showSuccessToast("Фильм успешно удалён");
      getFilms();
      dispatch(setIsServerRequest(false));
      dispatch(setIsUpdating(false));
    } catch (error: unknown) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      } else {
        showErrorToast(error as string);
      }
      console.error(error);
    }
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
