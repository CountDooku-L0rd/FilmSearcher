import { useAppDispatch } from "../../hooks/storeHooks";
import { useGetFilms } from "../../hooks/useGetFilms";
import { setServerError } from "../../store/mainSlice";
import styles from "./ServerErrorSection.module.css";

const ServerErrorSection = () => {
  const dispatch = useAppDispatch();
  const { getFilms } = useGetFilms();
  const onClickHandler = () => {
    dispatch(setServerError(false));
    getFilms();
  };
  return (
    <div className={styles.container}>
      <div className={styles.server_error_svg}></div>
      <p className={styles.text}>
        При загрузке данных произошла ошибка. Мы уже работаем над её
        устранением. Повторите попытку позже.
      </p>
      <button className={styles.button} onClick={onClickHandler}>
        Повторить попытку
      </button>
    </div>
  );
};

export default ServerErrorSection;
