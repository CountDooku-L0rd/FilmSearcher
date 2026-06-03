import ControlSection from "../ControlSection/ControlSection";
import FilmsSection from "../FilmsSection/FilmsSection";
import FilterSection from "../FilterAndSortSection/FilterAndSortSection";
import ServerErrorSection from "../ServerErrorSection/ServerErrorSection";
import styles from "./Main.module.css";
import { useAppSelector } from "../../hooks/storeHooks";
import Pagination from "../Pagination/Pagination";
import { useGetFilmsWithSync } from "../../hooks/useGetFilmsWithSync";

const Main = () => {
  const { pageSize } = useAppSelector((store) => store.filter);
  const { pagination } = useAppSelector((store) => store.main);
  const { error } = useGetFilmsWithSync();
  return (
    <main className={styles.main}>
      <ControlSection />
      <FilterSection />
      <FilmsSection />
      {error && <ServerErrorSection />}
      {pagination.total - pageSize >= 1 && <Pagination />}
    </main>
  );
};

export default Main;
