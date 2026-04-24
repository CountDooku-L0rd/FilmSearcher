import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";
import { useAppSelector } from "./hooks/storeHooks.ts";
import { useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/mira/theme.css";
import { Toaster } from "react-hot-toast";
import Main from "./components/Main/Main.tsx";

function App() {
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
      <Main/>
    </PrimeReactProvider>
  );
}

export default App;
