import { EStatus } from "@yp-mentor/films-server-types";
import styles from "./StatusFilmButton.module.css";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHooks";
import {
  setIsLoading,
  setIsServerRequest,
  setIsUpdating,
} from "../../../../store/mainSlice";
import { filmService } from "../../../../api/FilmsService";
import { showErrorToast, showSuccessToast } from "../../../../toasts/toasts";
import { useGetFilms } from "../../../../hooks/useGetFilms";

const StatusFilmButton = ({
  filmId,
  filmStatus,
}: {
  filmId: number;
  filmStatus: EStatus;
}) => {
  const { isServerRequest } = useAppSelector((store) => store.main);
  const dispatch = useAppDispatch();
  const { getFilms } = useGetFilms();
  const handleStatusClick = async (id: number, status?: EStatus) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setIsUpdating(true));
      dispatch(setIsServerRequest(true));
      await filmService.changeFilmStatus({
        body: {
          status:
            status === EStatus.in_plans ? EStatus.watched : EStatus.in_plans,
        },
        id: id.toString(),
      });
      showSuccessToast("Статус фильма успешно изменён");
      getFilms();
      dispatch(setIsServerRequest(false));
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
      className={`${styles.button} ${filmStatus === EStatus.in_plans ? styles.in_plans : styles.watched}`}
      onClick={() => handleStatusClick(filmId, filmStatus)}
      disabled={isServerRequest}
    />
  );
};

export default StatusFilmButton;
