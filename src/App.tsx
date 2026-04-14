import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";
import SortingSection from "./components/SortingSection/SortingSection.tsx";
import FilterSection from "./components/FilterSection/FilterSection.tsx";
import {CustomSelectProvider} from "./context/CustomSelectProvider.tsx";

function App() {
  useGetFilms({
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  return (
    <CustomSelectProvider>
      <Header />
      <SortingSection/>
      <FilterSection/>
    </CustomSelectProvider>
  );
}

export default App;