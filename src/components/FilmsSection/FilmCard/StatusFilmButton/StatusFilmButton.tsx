import { EStatus } from "@yp-mentor/films-server-types";
import styles from "./StatusFilmButton.module.css";
import { useAppSelector } from "../../../../hooks/storeHooks";

const StatusFilmButton = ({
  onClick,
  status,
}: {
  onClick: () => void;
  status: EStatus;
}) => {
  const { isServerRequest } = useAppSelector((store) => store.main);
  return (
    <button
      className={`${styles.button} ${status === EStatus.in_plans ? styles.in_plans : styles.watched}`}
      onClick={onClick}
      disabled={isServerRequest}
    />
  );
};

export default StatusFilmButton;
