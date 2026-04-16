import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";
import SortingSection from "./components/SortingSection/SortingSection.tsx";
import FilterSection from "./components/FilterSection/FilterSection.tsx";

function App() {
  useGetFilms({
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  return (
    <>
      <Header />
      <SortingSection/>
      <FilterSection/>
    </>
  );
}

export default App;