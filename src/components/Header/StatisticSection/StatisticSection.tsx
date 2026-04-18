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
          <div>
            {total && <p className={styles.number}>{total}</p>}
            {!total && <div className={styles.statistic_preloader}></div>}
          </div>
          <p className={styles.text}>Всего фильмов</p>
        </li>
        <li className={styles.list__elem}>
          <div>
            {watched && <p className={styles.number}>{watched}</p>}
            {!watched && <div className={styles.statistic_preloader}></div>}
          </div>
          <p className={styles.text}>Просмотрено</p>
        </li>
        <li className={styles.list__elem}>
          <div>
            {averageRating && <p className={styles.number}>{averageRating.toFixed(1)}</p>}
            {!averageRating && <div className={styles.statistic_preloader}></div>}
          </div>
          <p className={styles.text}>Средний рейтинг</p>
        </li>
      </ul>
    </>
  );
};

export default StatisticSection;
