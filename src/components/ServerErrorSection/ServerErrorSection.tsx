import { useGetFilmsWithSync } from "../../hooks/useGetFilmsWithSync";
import styles from "./ServerErrorSection.module.css";

const ServerErrorSection = () => {
  const { refetch } = useGetFilmsWithSync();
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
          refetch();
        }}
      >
        Повторить попытку
      </button>
    </div>
  );
};

export default ServerErrorSection;
