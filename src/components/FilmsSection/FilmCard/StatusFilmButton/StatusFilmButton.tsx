import { EStatus } from "@yp-mentor/films-server-types";
import styles from "./StatusFilmButton.module.css";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHooks";
import { setIsServerRequest, setIsUpdating } from "../../../../store/mainSlice";
import { showSuccessToast } from "../../../../toasts/toasts";
import { useGetFilms } from "../../../../hooks/useGetFilms";
import { useChangeFilmStatusMutation } from "../../../../store/api/filmsApi/filmsApi";

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
  const [changeFilmStatusTrigger] = useChangeFilmStatusMutation();
  const handleStatusClick = async (id: number, status?: EStatus) => {
    dispatch(setIsUpdating(true));
    dispatch(setIsServerRequest(true));
    changeFilmStatusTrigger({
      body: {
        status:
          status === EStatus.in_plans ? EStatus.watched : EStatus.in_plans,
      },
      id: id.toString(),
    })
      .then(() => {
        showSuccessToast("Статус фильма успешно изменён");
        getFilms();
      })
      .finally(() => {
        dispatch(setIsServerRequest(false));
      });
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
