import { useAppSelector } from "../../../../hooks/storeHooks";
import styles from "./DeleteFilmButton.module.css";

const DeleteFilmButton = ({ onClick }: { onClick: () => void }) => {
  const { isServerRequest } = useAppSelector((store) => store.main);
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={isServerRequest}
    />
  );
};

export default DeleteFilmButton;
