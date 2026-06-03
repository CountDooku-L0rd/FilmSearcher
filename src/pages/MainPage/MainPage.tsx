import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import AddPopup from "../../components/Popups/AddPopup";
import EditPopup from "../../components/Popups/EditPopup";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.movie_app}>
      <Header />
      <Main />
      <EditPopup />
      <AddPopup />
    </div>
  );
};

export default MainPage;
