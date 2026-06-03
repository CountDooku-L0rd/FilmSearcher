import { EStatus } from "@yp-mentor/films-server-types";
import styles from "./StatusFilmButton.module.css";
import { useAppDispatch } from "../../../../hooks/storeHooks";
import { useChangeFilmStatusMutation } from "../../../../hooks/useChangeFilmStatusMutation";

const StatusFilmButton = ({
  filmId,
  filmStatus,
}: {
  filmId: number;
  filmStatus: EStatus;
}) => {
  const dispatch = useAppDispatch();
  const changeFilmStatus = useChangeFilmStatusMutation(dispatch);
  return (
    <button
      className={`${styles.button} ${filmStatus === EStatus.in_plans ? styles.in_plans : styles.watched}`}
      onClick={() =>
        changeFilmStatus.mutate({
          filmId: filmId,
          changeStatus:
            filmStatus === EStatus.in_plans
              ? EStatus.watched
              : EStatus.in_plans,
        })
      }
      disabled={changeFilmStatus.isPending}
    />
  );
};

export default StatusFilmButton;
