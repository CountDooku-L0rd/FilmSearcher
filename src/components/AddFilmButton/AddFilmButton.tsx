import { useAppDispatch } from "../../hooks/storeHooks";
import { resetModal, setIsAddModalOpen } from "../../store/modalSlice";
import styles from "./AddFilmButton.module.css";

const AddFilmButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button className={styles.button} onClick={() => {
            dispatch(resetModal())
            dispatch(setIsAddModalOpen(true));
          }}>
      <span className={styles.button_svg}></span>
      Добавить фильм
    </button>
  );
};

export default AddFilmButton;
