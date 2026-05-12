import styles from "./RoutingLoad.module.css";

const RoutingLoad = () => {
  return (
    <div className={styles.load}>
      <div className={styles.loader}></div>
      <h2 className={styles.text}>Загрузка коллекции фильмов...</h2>
    </div>
  );
};

export default RoutingLoad;
