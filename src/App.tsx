import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";
import SortingSection from "./components/SortingSection/SortingSection.tsx";
import FilterSection from "./components/FilterSection/FilterSection.tsx";
import FilmsSection from "./components/FilmsSection/FilmsSection.tsx";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks.ts";
import { useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/mira/theme.css";
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";
import { setPage, setPageSize } from "./store/filterSlice.ts";

function App() {
  const [first, setFirst] = useState(0);
  const { filmStatistic } = useAppSelector((store) => store.main);
  const dispatch = useAppDispatch();
  const {
    endYear,
    statusValue,
    page,
    pageSize,
    genreValue,
    ratingValue,
    searchString,
    sortBy,
    sortingOrder,
    startYear,
  } = useAppSelector((store) => store.filter);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    dispatch(setPage(event.page + 1));
    setFirst(event.first);
    dispatch(setPageSize(event.rows));
  };
  const { getFilms } = useGetFilms();
  useEffect(() => {
    getFilms();
  }, [
    endYear,
    statusValue,
    page,
    pageSize,
    genreValue,
    ratingValue,
    searchString,
    sortBy,
    sortingOrder,
    startYear,
  ]);
  const mainSlice = useAppSelector((store) => store.main);
  return (
    <PrimeReactProvider>
      <Header />
      <main className="main">
        <SortingSection />
        <FilterSection />
        {mainSlice.isLoading && (
          <div>
            <div className={"preloader"}></div>
          </div>
        )}
        {!mainSlice.isLoading && <FilmsSection />}
        <Paginator
          rows={pageSize}
          first={first}
          totalRecords={filmStatistic.total}
          rowsPerPageOptions={[4, 8, 12, 16]}
          onPageChange={onPageChange}
        />
      </main>
    </PrimeReactProvider>
  );
}

export default App;
