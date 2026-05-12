import { useGetFilms } from "../../hooks/useGetFilms";
import styles from "./ServerErrorSection.module.css";

const ServerErrorSection = () => {
  const { getFilms } = useGetFilms();
  return (
    <div className={styles.container}>
      <div className={styles.server_error_svg}></div>
      <p className={styles.text}>
        При загрузке данных произошла ошибка. Мы уже работаем над её
        устранением. Повторите попытку позже.
      </p>
      <button
        className={styles.button}
        onClick={() => {
          getFilms();
        }}
      >
        Повторить попытку
      </button>
    </div>
  );
};

export default ServerErrorSection;
