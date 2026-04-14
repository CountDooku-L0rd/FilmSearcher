import styles from "./StatisticSection.module.css";
import { useAppSelector } from "../../../hooks/storeHooks.ts";

const StatisticSection = () => {
  const { total, averageRating, watched } = useAppSelector(
    (state) => state.main.filmStatistic,
  );
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.list__elem}>
          <p className={styles.number}>{total ? total : 'Нет данных'}</p>
          <p className={styles.text}>Всего фильмов</p>
        </li>
        <li className={styles.list__elem}>
          <p className={styles.number}>{watched ? watched : 'Нет данных'}</p>
          <p className={styles.text}>Просмотрено</p>
        </li>
        <li className={styles.list__elem}>
          <p className={styles.number}>{averageRating ? averageRating.toFixed(1) : 'Нет данных'}</p>
          <p className={styles.text}>Средний рейтинг</p>
        </li>
      </ul>
    </>
  );
};

export default StatisticSection;
