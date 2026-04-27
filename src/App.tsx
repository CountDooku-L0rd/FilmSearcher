import Header from "./components/Header/Header";
import "./App.css";
import "primereact/resources/themes/mira/theme.css";
import Main from "./components/Main/Main.tsx";
import useGetFilmsWithUpdates from "./hooks/useGetFilmsWithUpdates.ts";
import CustomToaster from "./components/CustomToaster/CustomToaster.tsx";
import EditPopup from "./components/Popups/EditPopup.tsx";
import AddPopup from "./components/Popups/AddPopup.tsx";

function App() {
  useGetFilmsWithUpdates();
  return (
    <>
      <CustomToaster />
      <Header />
      <Main />
      <EditPopup />
      <AddPopup/>
    </>
  );
}

export default App;
