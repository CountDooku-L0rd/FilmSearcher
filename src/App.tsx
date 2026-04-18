import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";
import SortingSection from "./components/SortingSection/SortingSection.tsx";
import FilterSection from "./components/FilterSection/FilterSection.tsx";
import FilmsSection from "./components/FilmsSection/FilmsSection.tsx";
import {useAppSelector} from "./hooks/storeHooks.ts";

function App() {
  useGetFilms();
  const mainSlice = useAppSelector(store => store.main)
  return (
    <>
      <Header />
        <main className="main">
            <SortingSection/>
            <FilterSection/>
            {mainSlice.isLoading && (
                <div>
                    <div className={'preloader'}></div>
                </div>
            )}
            {!mainSlice.isLoading && <FilmsSection/>}
        </main>
    </>
  );
}

export default App;