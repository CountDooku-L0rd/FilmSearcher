import { Paginator } from "primereact/paginator";
import ControlSection from "../ControlSection/ControlSection";
import FilmsSection from "../FilmsSection/FilmsSection";
import FilterSection from "../FilterSection/FilterSection";
import ServerErrorSection from "../ServerErrorSection/ServerErrorSection";
import styles from "./Main.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setPage, setPageSize } from "../../store/filterSlice";

const Main = () => {
  const { page, pageSize } = useAppSelector((store) => store.filter);
  const dispatch = useAppDispatch();
  const { pagination, serverError } = useAppSelector((store) => store.main);
  return (
    <main className={styles.main}>
      <ControlSection />
      <FilterSection />
      <FilmsSection />
      {serverError && <ServerErrorSection />}
      {pagination.total - pageSize >= 1 ? (
        <Paginator
          rows={pageSize}
          first={(page - 1) * pageSize}
          totalRecords={pagination.total}
          rowsPerPageOptions={[4, 8, 12, 16]}
          onPageChange={(event) => {
            dispatch(setPage(event.page + 1));
            dispatch(setPageSize(event.rows));
          }}
        />
      ) : null}
    </main>
  );
};

export default Main;
