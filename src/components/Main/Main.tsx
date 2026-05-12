import ControlSection from "../ControlSection/ControlSection";
import FilmsSection from "../FilmsSection/FilmsSection";
import FilterSection from "../FilterAndSortSection/FilterAndSortSection";
import ServerErrorSection from "../ServerErrorSection/ServerErrorSection";
import styles from "./Main.module.css";
import { useAppSelector } from "../../hooks/storeHooks";
import Pagination from "../Pagination/Pagination";
import { useGetFilmsMutation } from "../../store/api/filmsApi/filmsApi";

const Main = () => {
  const { pageSize } = useAppSelector((store) => store.filter);
  const { pagination } = useAppSelector((store) => store.main);
  const [, {isError}] = useGetFilmsMutation({
    fixedCacheKey: 'shared-get-films'
  });
  return (
    <main className={styles.main}>
      <ControlSection />
      <FilterSection />
      <FilmsSection />
      {isError && <ServerErrorSection />}
      {pagination.total - pageSize >= 1 && <Pagination />}
    </main>
  );
};

export default Main;
