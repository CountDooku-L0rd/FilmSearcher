import ControlSection from "../ControlSection/ControlSection";
import FilmsSection from "../FilmsSection/FilmsSection";
import FilterSection from "../FilterSection/FilterSection";
import ServerErrorSection from "../ServerErrorSection/ServerErrorSection";
import styles from "./Main.module.css";
import { useAppSelector } from "../../hooks/storeHooks";
import Pagination from "../Pagination/Pagination";

const Main = () => {
  const { pageSize } = useAppSelector((store) => store.filter);
  const { pagination, serverError } = useAppSelector((store) => store.main);
  return (
    <main className={styles.main}>
      <ControlSection />
      <FilterSection />
      <FilmsSection />
      {serverError && <ServerErrorSection />}
      {pagination.total - pageSize >= 1 ? <Pagination/> : null}
    </main>
  );
};

export default Main;
