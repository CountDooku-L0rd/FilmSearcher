import Header from "./components/Header/Header";
import "primereact/resources/themes/mira/theme.css";
import Main from "./components/Main/Main.tsx";
import useGetFilmsWithUpdates from "./hooks/useGetFilmsWithUpdates.ts";
import CustomToaster from "./components/shared/CustomToaster/CustomToaster.tsx";
import EditPopup from "./components/Popups/EditPopup.tsx";
import AddPopup from "./components/Popups/AddPopup.tsx";
import styles from './App.module.css'

function App() {
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
}

export default App;
