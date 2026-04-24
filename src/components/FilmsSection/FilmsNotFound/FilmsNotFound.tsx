import styles from "./FilmsNotFound.module.css";

const FilmsNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.not_found_svg}></div>
      <p className={styles.text}>Не удалось найти фильмы по заданным критериям</p>
    </div>
  );
};

export default FilmsNotFound;
