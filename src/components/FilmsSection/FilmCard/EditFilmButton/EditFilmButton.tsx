import { useAppSelector } from "../../../../hooks/storeHooks";
import styles from "./EditFilmButton.module.css";

const EditFilmButton = ({ onClick }: { onClick: () => void }) => {
  const { isServerRequest } = useAppSelector((store) => store.main);
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={isServerRequest}
    />
  );
};

export default EditFilmButton;
