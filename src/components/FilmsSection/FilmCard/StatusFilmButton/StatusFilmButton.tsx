import { EStatus } from "@yp-mentor/films-server-types";
import styles from "./StatusFilmButton.module.css";

const StatusFilmButton = ({
  onClick,
  status,
}: {
  onClick: () => void;
  status: EStatus;
}) => {
  return (
    <button
      className={`${styles.button} ${status === EStatus.in_plans ? styles.in_plans : styles.watched}`}
      onClick={onClick}
    />
  );
};

export default StatusFilmButton;
