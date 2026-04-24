import styles from "./StatisticSection.module.css";
import { useAppSelector } from "../../../hooks/storeHooks.ts";
import { useEffect, useRef } from "react";

const StatisticSection = () => {
  const isFirstRender = useRef(true)

  const {isLoading} = useAppSelector(store => store.main)
  
  const { total, averageRating, watched } = useAppSelector(
    (state) => state.main.filmStatistic,
  );
  useEffect(() =>{
    if (total || averageRating || watched){
      isFirstRender.current = false
    }
  }, [total, averageRating, watched])
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.list__elem}>
          <div>
            {(total && !isLoading) && <p className={styles.number}>{total}</p>}
            {(!total || isLoading) && <div className={styles.statistic_sceleton}></div>}
          </div>
          {isFirstRender.current ? <div className={styles.statistic_field_sceleton}></div> : <p className={styles.text}>Всего фильмов</p>}
        </li>
        <li className={styles.list__elem}>
          <div>
            {(watched && !isLoading) && <p className={styles.number}>{watched}</p>}
            {(!watched || isLoading) && <div className={styles.statistic_sceleton}></div>}
          </div>
          {isFirstRender.current ? <div className={styles.statistic_field_sceleton}></div> : <p className={styles.text}>Просмотрено</p>}
        </li>
        <li className={styles.list__elem}>
          <div>
            {(averageRating && !isLoading) && <p className={styles.number}>{averageRating.toFixed(1)}</p>}
            {(!averageRating || isLoading) && <div className={styles.statistic_sceleton}></div>}
          </div>
          {isFirstRender.current ? <div className={styles.statistic_field_sceleton}></div> : <p className={styles.text}>Средний рейтинг</p>}
        </li>
      </ul>
    </>
  );
};

export default StatisticSection;
