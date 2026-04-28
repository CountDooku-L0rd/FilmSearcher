import styles from "./StatisticSection.module.css";
import { useAppSelector } from "../../../hooks/storeHooks.ts";

const StatisticSection = () => {
  const { isLoading, serverError, filmStatistic, isUpdating } = useAppSelector(
    (store) => store.main,
  );

  const { total, averageRating, watched } = filmStatistic;
  if (serverError) return null;
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.list__elem}>
          <div>
            {total && !isUpdating && <p className={styles.number}>{total}</p>}
            {(!total || (isUpdating && isLoading)) && (
              <div className={styles.statistic_skeleton}></div>
            )}
          </div>
          {total !== 0 && !total ? (
            <div className={styles.statistic_field_skeleton}></div>
          ) : (
            <p className={styles.text}>Всего фильмов</p>
          )}
        </li>
        <li className={styles.list__elem}>
          <div>
            {watched && !isUpdating && (
              <p className={styles.number}>{watched}</p>
            )}
            {(!watched || (isUpdating && isLoading)) && (
              <div className={styles.statistic_skeleton}></div>
            )}
          </div>
          {watched !== 0 && !watched ? (
            <div className={styles.statistic_field_skeleton}></div>
          ) : (
            <p className={styles.text}>Просмотрено</p>
          )}
        </li>
        <li className={styles.list__elem}>
          <div>
            {averageRating && !isUpdating && (
              <p className={styles.number}>{averageRating.toFixed(1)}</p>
            )}
            {(!averageRating || (isUpdating && isLoading)) && (
              <div className={styles.statistic_skeleton}></div>
            )}
          </div>
          {averageRating !== 0 && !averageRating ? (
            <div className={styles.statistic_field_skeleton}></div>
          ) : (
            <p className={styles.text}>Средний рейтинг</p>
          )}
        </li>
      </ul>
    </>
  );
};

export default StatisticSection;
