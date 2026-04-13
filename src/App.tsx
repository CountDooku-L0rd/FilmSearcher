import { useGetFilms } from "./hooks/useGetFilms";
import Header from "./components/Header/Header";
import "./App.css";

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
    </>
  );
}

export default App;
