import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";
import SortingSection from "./components/SortingSection/SortingSection.tsx";
import FilterSection from "./components/FilterSection/FilterSection.tsx";
import FilmsSection from "./components/FilmsSection/FilmsSection.tsx";

function App() {
  useGetFilms({
    pagination: {
      page: 1,
      pageSize: 8,
    },
  });
  return (
    <>
      <Header />
        <main className="main">
            <SortingSection/>
            <FilterSection/>
            <FilmsSection/>
        </main>
    </>
  );
}

export default App;