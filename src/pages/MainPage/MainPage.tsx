import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import AddPopup from "../../components/Popups/AddPopup";
import EditPopup from "../../components/Popups/EditPopup";
import CustomToaster from "../../components/shared/CustomToaster/CustomToaster";
import useGetFilmsWithUpdates from "../../hooks/useGetFilmsWithUpdates";
import styles from "./MainPage.module.css";

const MainPage = () => {
  useGetFilmsWithUpdates();
  return (
    <div className={styles.movie_app}>
      <CustomToaster />
      <Header />
      <Main />
      <EditPopup />
      <AddPopup />
    </div>
  );
};

export default MainPage;
