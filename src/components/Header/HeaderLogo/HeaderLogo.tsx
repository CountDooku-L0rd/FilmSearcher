import styles from "./HeaderLogo.module.css";
import logo from "../../../assets/logo.svg";

const HeaderLogo = () => {
  return (
    <>
      <div className={styles.logo__container}>
        <img className={styles.logo__img} src={logo}></img>
        <h1 className={styles.logo__text}>Коллекция Фильмов</h1>
      </div>
    </>
  );
};

export default HeaderLogo;
