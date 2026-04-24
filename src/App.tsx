import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";
import FilterSection from "./components/FilterSection/FilterSection.tsx";
import FilmsSection from "./components/FilmsSection/FilmsSection.tsx";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks.ts";
import { useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/mira/theme.css";
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";
import { setPage, setPageSize } from "./store/filterSlice.ts";
import { Toaster } from "react-hot-toast";
import ServerErrorSection from "./components/ServerErrorSection/ServerErrorSection.tsx";
import ControlSection from "./components/ControlSection/ControlSection.tsx";

function App() {
  const { pagination, serverError } = useAppSelector((store) => store.main);
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
  return (
    <PrimeReactProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Header />
      <main className="main">
        {!serverError && <ControlSection />}
        {!serverError && <FilterSection />}
        {!serverError && <FilmsSection />}
        {serverError && <ServerErrorSection/>}
        {pagination.total-pageSize>=1 ? <Paginator
          rows={pageSize}
          first={(page - 1) * pageSize}
          totalRecords={pagination.total}
          rowsPerPageOptions={[4, 8, 12, 16]}
          onPageChange={onPageChange}
        />
        : null}
      </main>
    </PrimeReactProvider>
  );
}

export default App;
